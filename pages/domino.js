import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/domino1.png"
import kio2 from "../public/img//projects/domino2.png"
import kio3 from "../public/img//projects/domino3.png"
import kioV from "../public/img//projects/dominoV.png"
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'

const Github = () => {
    const [activeImage, setActiveImage] = useState(0)

    const handleScreenshot = (value) => {
        setActiveImage(value)
    }

    const screenshots = [kioV, kio1, kio2, kio3];

    return (
        <Layout>
            <div className="game">
                <h1>Domino</h1>
                <div className="game-box">
                    <div>
                        {
                            activeImage == 0 ?
                                <div className="video">
                                    <ReactPlayer url='https://www.youtube.com/watch?v=iNHwY4ZRQ3w'
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
                        <h2>Description</h2>
                        <p>This is a recreation of the Domino board game made for the Data Structures course at the National University of Colombia, Medellin campus. The game has only one mode: player versus 3 AI opponents, each with 7 randomly distributed tiles.</p>
                        <p><br />The game ends when any player runs out of tiles or if the game stalls (none of the players can move). In that case, the player with the fewest points wins by adding up the values of their tiles.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Design <br /> • 2D Art</p>
                        <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/domino">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Domino">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;