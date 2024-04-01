import Navbar from "@/components/nav/navbar";
import Footer from "@/components/nav/footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
