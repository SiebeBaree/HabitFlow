import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

type UserDropdownProps = {
    image?: string | null;
    name: string;
};

export default function UserDropdown({ image, name }: UserDropdownProps) {
    return (
        <div className="border-highlight flex select-none items-center gap-2 rounded-md bg-secondary px-3 py-2">
            <Avatar className="h-6 w-6">
                <AvatarImage
                    src={image ?? "/logo.png"}
                    alt="User avatar of your account"
                />
                <AvatarFallback>
                    {name
                        .split(" ")
                        .map((name) => name[0])
                        .join("") ?? "U"}
                </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{name}</p>
            <ChevronDown className="h-4 w-4 text-primary transition-all duration-300 ease-in-out group-data-[state=open]:rotate-180" />
        </div>
    );
}
