import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/m31.png"
import kio2 from "../public/img//projects/m32.png"
import { useState } from "react";

const Github = () => {
    const [activeImage, setActiveImage] = useState(0)

    const handleScreenshot = (value) => {
        setActiveImage(value)
    }

    const screenshots = [kio1, kio2];

    return (
        <Layout>
            <div className="game">
                <h1>VR UNAL (in progress)</h1>
                <h2>VR Game</h2>
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
                        </div>
                    </div>
                    <div>
                        <h2>Description</h2>
                        <p>VR UNAL is an augmented reality game made for the National University of Colombia, Medellín campus, where players can explore a small floating island that contains one of the university's most representative buildings (Block M3). As students explore the game, they will learn facts and a bit of history about the university's Faculty of Engineering.</p>

                        <h2>Roles</h2>
                        <p>• Game Development <br /> • 3D Artist</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;