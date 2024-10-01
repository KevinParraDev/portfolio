import Link from "next/link";
import Image from "next/image";
import kio from "../public/img//projects/kioP.png"
import zeri from "../public/img//projects/zeriP.png"
import surviveBird from "../public/img//projects/surviveBirdP.png"
import grecko from "../public/img//projects/greckoP.png"
import domino from "../public/img//projects/dominoP.png"
import hamster from "../public/img//projects/hamsterP.png"
import mdf from "../public/img//projects/mdfP.png"
import robot from "../public/img//projects/robotP.png"
import m3 from "../public/img//projects/m3P.png"
import ReactPlayer from 'react-player'

const Projects = () => {
    return (
        <div>
            <h1 className="subtitulo" id="projects">Projects</h1>

            <div className="proyectos">

                <div className="proyectos-cards">
                    <Link href="/zeri-adventure">
                        <Image
                            src={zeri}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Zeri's Adventure</p>
                    <p className="project-target-year">2023</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/hamster-run">
                        <Image
                            src={hamster}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Hamster Run</p>
                    <p className="project-target-year">in progress</p>
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
                    <p className="project-target-year">2021</p>
                </div>

                <div className="proyectos-cards">
                    <Link href="/grecko-vs-machine">
                        <Image
                            src={grecko}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Grecko Vs Machine</p>
                    <p className="project-target-year">in progress</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/knock-it-out">
                        <Image
                            src={kio}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Knock It Out</p>
                    <p className="project-target-year">2024</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/maquinas-del-futuro">
                        <Image
                            src={mdf}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>Maquinas del Futuro</p>
                    <p className="project-target-year">2023</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/el-amigo-robot">
                        <Image
                            src={robot}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>El Amigo Robot</p>
                    <p className="project-target-year">2024</p>
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
                    <p className="project-target-year">2022</p>
                </div>
                <div className="proyectos-cards">
                    <Link href="/vr-unal">
                        <Image
                            src={m3}
                            alt="kio icon"
                            className="image-project"
                        />
                    </Link>
                    <p>VR UNAL</p>
                    <p className="project-target-year">in progress</p>
                </div>
            </div>

            <br />
            <br />
        </div>
    )
}

export default Projects;