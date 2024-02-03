import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/hamster1.png"
import kio2 from "../public/img//projects/hamster2.png"
import kio3 from "../public/img//projects/hamster3.png"
import { useState } from "react";

const Github = () => {
    const [activeImage, setActiveImage] = useState(0)

    const handleScreenshot = (value) => {
        setActiveImage(value)
    }

    const screenshots = [kio1, kio2, kio3];

    return (
        <Layout>
            <div className="game">
                <h1>Hamster Run (en desarrollo)</h1>
                <div className="game-box">
                    <div>
                        <Image
                            src={screenshots[activeImage]}
                            alt="kio icon"
                            quality={100}
                            className="image-project"
                        />
                        <div className="carrusel-lista">
                            <Image
                                src={kio1}
                                alt="kio icon"
                                className={activeImage === 0 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(0)}
                            />
                            <Image
                                src={kio2}
                                alt="kio icon"
                                className={activeImage === 1 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(1)}
                            />
                            <Image
                                src={kio3}
                                alt="kio icon"
                                className={activeImage === 2 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(2)}
                            />
                        </div>
                    </div>
                    <div>
                        <h2>Descripción</h2>
                        <p>Hamster Run es un juego tipo runner en el que eres un hamster que irá corriendo a lo largo del mapa y tu deber será esquivar todos los obstaculos, en el mapa puedes encontrar diferentes poderes que serviran para ayudarte o hacerte mas dificil la partida</p>
                        <p><br />Cuenta con un menu de inicio que permite personalizar el personaje. los diseños y animaciones de este videojuego fueron elaborados en animate cc y photoshop</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;