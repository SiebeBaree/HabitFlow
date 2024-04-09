"use server";

import { env } from "@/env";
import { getProduct, webhookHasData, webhookHasMeta } from "@/lib/utils";
import { auth } from "@/server/auth";
import { getUserByEmail } from "@/server/data/user";
import { db } from "@/server/db";
import {
    type WebhookEvent,
    webhookEvents,
    orders,
    premium,
} from "@/server/db/schema";
import { configureLemonSqueezy } from "@/server/lemonsqueezy";
import {
    createCheckout,
    createWebhook,
    listWebhooks,
} from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";

export async function getCheckoutURL(variantId: number) {
    configureLemonSqueezy();

    const session = await auth();
    if (!session?.user) {
        return {
            success: false,
            error: "Not authenticated",
        };
    }

    const checkout = await createCheckout(
        env.LEMONSQUEEZY_STORE_ID,
        variantId,
        {
            checkoutOptions: {
                embed: false,
                media: false,
                logo: false,
            },
            checkoutData: {
                name: session.user.name ?? undefined,
                email: session.user.email ?? undefined,
                custom: {
                    user_id: session.user.id,
                },
            },
            productOptions: {
                enabledVariants: [variantId],
                redirectUrl: `${env.WEBHOOK_URL}/app`,
                receiptButtonText: "Go to HabitFlow",
                receiptThankYouNote:
                    "Thank you for buying HabitFlow Premium! 🎉",
            },
        },
    );

    return {
        success: true,
        checkoutUrl: checkout.data?.data.attributes.url,
    };
}

export async function hasWebhook() {
    configureLemonSqueezy();

    // Check if a webhook exists on Lemon Squeezy.
    const allWebhooks = await listWebhooks({
        filter: { storeId: env.LEMONSQUEEZY_STORE_ID },
    });

    // Check if WEBHOOK_URL ends with a slash. If not, add it.
    let webhookUrl = env.WEBHOOK_URL;
    if (!webhookUrl.endsWith("/")) {
        webhookUrl += "/";
    }
    webhookUrl += "api/webhook";

    const webhook = allWebhooks.data?.data.find(
        (wh) => wh.attributes.url === webhookUrl && wh.attributes.test_mode,
    );

    return webhook;
}

export async function setupWebhook() {
    configureLemonSqueezy();

    // Check if WEBHOOK_URL ends with a slash. If not, add it.
    let webhookUrl = env.WEBHOOK_URL;
    if (!webhookUrl.endsWith("/")) {
        webhookUrl += "/";
    }
    webhookUrl += "api/webhook";

    // Do not set a webhook on Lemon Squeezy if it already exists.
    let webhook = await hasWebhook();

    // If the webhook does not exist, create it.
    if (!webhook) {
        const newWebhook = await createWebhook(env.LEMONSQUEEZY_STORE_ID, {
            secret: env.LEMONSQUEEZY_WEBHOOK_SECRET,
            url: webhookUrl,
            testMode: env.NODE_ENV === "development",
            events: ["order_created"],
        });

        webhook = newWebhook.data?.data;
    }
}

export async function storeWebhookEvent(
    eventName: string,
    body: WebhookEvent["body"],
) {
    const returnedValue = await db
        .insert(webhookEvents)
        .values({
            eventName,
            processed: false,
            body,
        })
        .onConflictDoNothing()
        .returning();

    return returnedValue[0];
}

export async function processWebhookEvent(webhookEvent: WebhookEvent) {
    configureLemonSqueezy();

    const dbwebhookEvent = await db
        .select()
        .from(webhookEvents)
        .where(eq(webhookEvents.id, webhookEvent.id));

    if (dbwebhookEvent.length < 1) {
        throw new Error(
            `Webhook event #${webhookEvent.id} not found in the database.`,
        );
    }

    let processingError = "";
    const eventBody = webhookEvent.body;

    if (!webhookHasMeta(eventBody)) {
        processingError = "Event body is missing the 'meta' property.";
    } else if (webhookHasData(eventBody)) {
        if (webhookEvent.eventName === "order_created") {
            const attributes = eventBody.data.attributes;
            const variantId = attributes.first_order_item.variant_id.toString();

            const product = getProduct(variantId);
            if (!product) {
                processingError = `Product with variantId ${variantId} not found.`;
            } else {
                const data = {
                    uid: attributes.identifier as string,
                    lemonSqueezyId: eventBody.data.id,
                    orderId: attributes.first_order_item.order_id,
                    name: attributes.user_name as string,
                    email: attributes.user_email as string,
                    status: attributes.status as string,
                    statusFormatted: attributes.status_formatted as string,
                    price: product.price.now.toString(),
                    productId: parseInt(product.planId, 10),
                    variantId: parseInt(variantId, 10),
                    createdAt: attributes.created_at as string,
                };

                try {
                    await db.insert(orders).values(data).onConflictDoUpdate({
                        target: orders.lemonSqueezyId,
                        set: data,
                    });

                    const user = await getUserByEmail(data.email);
                    if (user) {
                        await db
                            .update(premium)
                            .set({
                                role:
                                    product.name === "Dedicated"
                                        ? "dedicated"
                                        : "starter",
                            })
                            .where(eq(premium.userId, user.id));
                    } else {
                        processingError = `User with email ${data.email} not found.`;
                    }
                } catch (error) {
                    processingError = `Failed to upsert Order #${data.lemonSqueezyId} to the database.`;
                }
            }
        }

        await db
            .update(webhookEvents)
            .set({
                processed: true,
                processingError,
            })
            .where(eq(webhookEvents.id, webhookEvent.id));
    }
}
