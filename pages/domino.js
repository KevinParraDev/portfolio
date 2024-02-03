import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/domino1.png"
import kio2 from "../public/img//projects/domino2.png"
import kio3 from "../public/img//projects/domino3.png"
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
                <h1>Domino</h1>
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
                        <p>Esta es una recreación del juego de mesa Dominó hecha para la materia Estructura de datos de la Universidad Nacional de Colombia sede Medellin, el juego cuenta con solo una modalidad, el jugador contra 3 maquinas, cada uno con 7 fichas repartidas al azar.</p>
                        <p><br />El juego termina cuando alguno de los jugadores se quede sin fichas o si el juego se ahoga (Ninguno de los jugadores puede mover), en ese caso gana el jugador que menos puntos tenga al sumar los valores de sus fichas.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art</p>
                        <h2>Juega ahora!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/domino">Itch.io</a>
                        <h2>Repositorio</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Domino">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;