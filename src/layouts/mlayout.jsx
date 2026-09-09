import Header from "../components/header";
import Footer from "../components/footer";
import HomeButton from "../components/homeButton";
import ScrollToTop from "../components/scrollToTop";

export default function MainLayout({ children }) {
    return (
        <>
            <ScrollToTop />

            <Header />

            <HomeButton />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}