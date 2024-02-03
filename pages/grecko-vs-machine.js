import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/grecko1.png"
import kio2 from "../public/img//projects/grecko2.png"
import kio3 from "../public/img//projects/grecko3.png"
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
                <h1>Grecko Vs Machine (en desarrollo)</h1>
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
                        <p>Grecko Vs Machine es el videojuego en el que estoy trabajando actualmente, se trata de un plataformer 2D tipo metroidvania en el cual eres un lagarto llamado grecko que tiene que salvar al mundo de una invasión de robots.</p>
                        <p><br />Se espera lanzar la beta antes de mediados del 2024.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>
                        <h2>(Disponible a mediados de 2024)</h2>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;