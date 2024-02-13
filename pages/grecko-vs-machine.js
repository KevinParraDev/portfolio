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
                <h1>Grecko Vs Machine (in progress)</h1>
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
                        <p>Grecko Vs Machine is the video game I am currently working on. It's a 2D platformer game in the style of metroidvania where you play as a lizard named Grecko who has to save the world from a robot invasion.</p>
                        <p><br />We expect to release the beta before mid-2024.</p>
                        <h2>Roles</h2>
                        <p>• Game Development <br /> • Game Design <br /> • 2D Art <br /> • Animation</p>
                        <h2>(Available by mid-2024)</h2>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;