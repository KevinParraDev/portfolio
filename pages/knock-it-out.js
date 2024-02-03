import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/kio.png"
import kio2 from "../public/img//projects/kio2.png"
import kio3 from "../public/img//projects/kio3.png"
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
                <h1>Knock It Out: The Show</h1>
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
                        <p>Knock It Out: The Show es un juego plataformer2D para dos jugadores en el cual uno de ellos tomará control del participante del concurso Knock It Out, mientras que el otro será el público del show, que no solo se reirá de los fallos del participante sino que también le hará la vida imposible lanzandole pasteles para hacerlo fallar.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>
                        <h2>Juega ahora!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/knock-it-out-the-show">Itch.io</a>
                        <h2>Repositorio</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Knock-It-Out-The-Show">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;