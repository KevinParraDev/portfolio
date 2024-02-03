import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/surviveBird1.png"
import kio2 from "../public/img//projects/surviveBird2.png"
import kio3 from "../public/img//projects/surviveBird3.png"
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
                <h1>Survive Bird</h1>
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
                        <p>Survive Bird es un Juego casual para Android en el que serás un ave y tendrás sobrevivir la mayor cantidad de tiempo que te sea posible esquivando todos los obstáculos que aparecen en pantalla, el juego cuenta con mas de 30 aves diferentes, consíguelas todas!</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>
                        <h2>Juega ahora!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/survive-bird">Itch.io</a>
                        <h2>Repositorio</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Survive-Bird">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;