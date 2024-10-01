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

    const screenshots = [kio2, kio1, kio3];

    return (
        <Layout>
            <div className="game">
                <h1>Hamster Run (in progress)</h1>
                <h2>Vertical Runner Game</h2>
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
                                src={kio2}
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
                                src={kio3}
                                alt="kio icon"
                                className={activeImage === 2 ? "screenshot-active" : "screenshot"}
                                onClick={() => handleScreenshot(2)}
                            />
                        </div>
                    </div>
                    <div>
                        <h2>Description</h2>
                        <p>Hamster Run is a runner-style game where you play as a hamster running along the map, and your duty is to dodge all obstacles. Throughout the map, you can find different power-ups that will either help you or make the game more challenging.</p>
                        <p><br />It features a start menu that allows you to customize the character. The designs and animations of this video game were created in Animate CC and Photoshop.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Design <br /> • 2D Art <br /> • Animation</p>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;