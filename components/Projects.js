import Link from "next/link";
import Image from "next/image";
import kio from "../public/img//projects/kio.png"
import zeri from "../public/img//projects/zeri.png"
import surviveBird from "../public/img//projects/surviveBird1.png"
import grecko from "../public/img//projects/grecko1.png"
import domino from "../public/img//projects/domino1.png"
import hamster from "../public/img//projects/hamster1.png"

const Projects = () => {
    return (
        <div>
            <h1 className="subtitulo" id="projects">Projects</h1>
            <div className="proyectos">
                <div className="proyectos-cards">
                    <Link href="/knock-it-out">
                        <Image
                            src={kio}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Knock It Out</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/zeri-adventure">
                        <Image
                            src={zeri}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Zeri's Adventure</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/survive-bird">
                        <Image
                            src={surviveBird}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Survive Bird</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/domino">
                        <Image
                            src={domino}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Domino</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/grecko-vs-machine">
                        <Image
                            src={grecko}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Grecko Vs Machine  (in progress)</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/hamster-run">
                        <Image
                            src={hamster}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Hamster Run  (in progress)</p>
                </div>
            </div>

            <br />
            <br />
        </div>
    )
}

export default Projects;