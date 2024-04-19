import Navbar from "./Navbar"
import Fotter from "./Fotter"

const Layout = ({ children }) => (
    <>
        <Navbar />

        <main className="container py-4">
            {children}
        </main>

        <Fotter />
    </>
)

export default Layout;