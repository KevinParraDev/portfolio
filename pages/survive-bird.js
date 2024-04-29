import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/surviveBird1.png"
import kio2 from "../public/img//projects/surviveBird2.png"
import kio3 from "../public/img//projects/surviveBird3.png"
import kioV from "../public/img//projects/surviveBirdV.png"
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
                <h1>Survive Bird</h1>
                <div className="game-box">
                    <div>
                        {
                            activeImage == 0 ?
                                <div className="video">
                                    <ReactPlayer url='https://www.youtube.com/shorts/B6aaNSXehuA'
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

                        <h2>Description</h2>
                        <p>Survive Bird is a casual Android game where you'll be a bird and you'll have to survive for as long as possible by dodging all the obstacles that appear on the screen. The game features over 30 different birds; collect them all!</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Design <br /> • 2D Art <br /> • Animation</p>
                        <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/survive-bird">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Survive-Bird">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;