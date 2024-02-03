import Banner from "../components/Banner";
import Contact from "../components/Contact";
import Layout from "../components/Layout";
import Skills from "../components/Skills";
import Projects from "../components/projects";

const Index = () => (
    <Layout>
        <Banner></Banner>
        <Skills></Skills>
        <Projects></Projects>
        <Contact></Contact>
        <button onClick={async () => {
            const res = await fetch('/api/send', { method: 'POST', })
            const data = await res.json()
            console.log(data)
        }}>Enviar</button>
    </Layout>
)

export default Index;