import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/zeri1.png"
import kio2 from "../public/img//projects/zeri2.png"
import kio3 from "../public/img//projects/zeri3.png"
import kioV from "../public/img//projects/zeriV.png"
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
import Link from "next/link";

const Github = () => {
    const [activeImage, setActiveImage] = useState(0)

    const handleScreenshot = (value) => {
        setActiveImage(value)
    }

    const screenshots = [kioV, kio1, kio2, kio3];

    return (
        <Layout>
            <div className="game">
                <h1>Zeri's Adventure</h1>
                <h2>2D Metroidvania Game</h2>
                <div className="game-box">
                    <div>
                        {
                            activeImage == 0 ?
                                <div className="video">
                                    <ReactPlayer url='https://www.youtube.com/watch?v=cMdAMpP4f-E'
                                        loop
                                        controls
                                        width={"100%"}
                                        height={"100%"}
                                    />
                                </div> :
                                <Image
                                    src={screenshots[activeImage]}
                                    alt="kio icon"
                                    quality={100}
                                    className="image-project"
                                />
                        }
                        <div className="carrusel-lista">
                            <Image
                                src={kioV}
                                alt="kio icon"
                                className={activeImage === 0 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(0)}
                            />
                            <Image
                                src={kio1}
                                alt="kio icon"
                                className={activeImage === 1 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(1)}
                            />
                            <Image
                                src={kio2}
                                alt="kio icon"
                                className={activeImage === 2 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(2)}
                            />
                            <Image
                                src={kio3}
                                alt="kio icon"
                                className={activeImage === 3 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(3)}
                            />
                        </div>
                    </div>
                    <div>

                        <div className="project-buttons">
                            <div className="play-button">
                                <Link target="_blank" href="https://kevin-parra.itch.io/zeris-adventure">
                                    PLAY
                                </Link>
                            </div>
                            <div className="play-button">
                                <Link target="_blank" href="https://github.com/KevinParraDev/Zeri-s-Adventure">
                                    GitHub
                                </Link>
                            </div>
                        </div>

                        <h2>Description</h2>
                        <p>Zeri's Adventure is a short metroidvania-style platformer game, where you play as Zeri, a blue-haired girl who, for unknown reasons, finds herself inside a cave. Your goal is to escape, but to do so, you need to overcome all the adversities that the cave brings: acid pits, poisonous bushes, and of course, monsters.</p>
                        <p><br />Throughout the map, you will acquire different abilities that will allow you to keep progressing. Good luck!</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Design <br /> • 2D Art <br /> • Animation</p>
                        {/* <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/zeris-adventure">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Zeri-s-Adventure">Github.com</a> */}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;