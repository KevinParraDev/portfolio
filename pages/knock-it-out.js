import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/kio.png"
import kio2 from "../public/img//projects/kio2.png"
import kio3 from "../public/img//projects/kio3.png"
import kioV from "../public/img//projects/kioV.png"
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
                <h1>Knock It Out: The Show</h1>
                <div className="game-box">
                    <div>
                        {
                            activeImage == 0 ?
                                <div className="video">
                                    <ReactPlayer url='https://www.youtube.com/watch?v=eDbnl1O5HIs'
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
                        <br />
                    </div>
                    <div>

                        <h2>Description</h2>
                        <p>Knock It Out: The Show is a 2D platformer game for two players in which one of them will take control of the Knock It Out contestant, while the other will be the audience of the show, who will not only laugh at the contestant's mistakes but also make their life impossible by throwing pies at them to make them fail.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>
                        <h2>Tools and languages</h2>
                        <p>• Unity 2D <br /> • C# <br /> • Aseprite</p>
                        <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/knock-it-out-the-show">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Knock-It-Out-The-Show">Github.com</a>
                        {/* <h2>Desarrollo</h2>
                        <p>Este videojuego fue realizado para la Global Game Jam 2024: Sede Medellín, el tiempo de desarrollo del proyecto fue de 48 horas. En este proyecto tuve el papel de programador, artista 2D y game designer, en su desarrollo usé el motor de videojuegos Unity, el lenguaje de programación C# y los assets los hice en aseprite.</p> */}



                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;