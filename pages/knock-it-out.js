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

                        <h2>Description</h2>
                        <p>Knock It Out: The Show is a 2D platformer game for two players in which one of them will take control of the Knock It Out contestant, while the other will be the audience of the show, who will not only laugh at the contestant's mistakes but also make their life impossible by throwing pies at them to make them fail.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Desing <br /> • 2D Art <br /> • Animation</p>
                        <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/knock-it-out-the-show">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Knock-It-Out-The-Show">Github.com</a>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;