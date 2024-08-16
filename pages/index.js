import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import About from "../components/About";
import Reels from "../components/Reels";

const Index = () => (
    <Layout>
        <Banner></Banner>
        <Skills></Skills>
        <About></About>
        <Reels></Reels>
        <Projects></Projects>
        {/* <Contact></Contact> */}
    </Layout>
)

export default Index;