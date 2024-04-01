import Link from "next/link";

type NavItemProps = {
    name: string;
    href: string;
};

export default function NavItem({ name, href }: NavItemProps) {
    return (
        <Link
            href={href}
            className="flex h-10 items-center justify-center rounded-md px-4 transition-all duration-150 ease-in-out hover:bg-primary/10 lg:px-8"
        >
            {name}
        </Link>
    );
}
