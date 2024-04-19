import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img/galery/kio (1).gif"
import kio2 from "../public/img/galery/kio (2).gif"
import kio3 from "../public/img/galery/kio (3).gif"
import za1 from "../public/img/galery/za1.gif"
import za2 from "../public/img/galery/za2.gif"
import za3 from "../public/img/galery/za3.gif"
import zae1 from "../public/img/galery/zae1.gif"
import zae2 from "../public/img/galery/ToroCorriendo.gif"
import gvm1 from "../public/img/galery/gvm1.gif"
import gvm2 from "../public/img/galery/gvm2.gif"
import gvm3 from "../public/img/galery/gvm3.gif"
import ht1 from "../public/img/galery/ht1.gif"
import ht2 from "../public/img/galery/ht2.gif"
import ht3 from "../public/img/galery/ht3.gif"
import ht4 from "../public/img/galery/ht4.gif"
import env1 from "../public/img/galery/env1.png"
import env2 from "../public/img/galery/env2.png"
import env3 from "../public/img/galery/env3.png"
import env4 from "../public/img/galery/env4.png"
import env5 from "../public/img/galery/env5.png"
import env6 from "../public/img/galery/env6.png"
import extra1 from "../public/img/galery/extra1.png"
import extra2 from "../public/img/galery/extra2.png"
import extra3 from "../public/img/galery/extra3.png"
import extra4 from "../public/img/galery/extra4.png"
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
                <h1>Characters</h1>
                <h2>Juan</h2>
                <h3>From: Knock It Out: The Show</h3>
                <div>
                    <Image
                        src={kio2}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                    <Image
                        src={kio1}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                    <Image
                        src={kio3}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                </div>
                <h2>Zeri</h2>
                <h3>From: Zeri's Adventure</h3>
                <div>
                    <Image
                        src={za1}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                    <Image
                        src={za2}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                    <Image
                        src={za3}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                </div>
                <h3>From: Grecko vs Machine</h3>
                <div>
                    <Image
                        src={gvm1}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                    <Image
                        src={gvm2}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-s"
                    />
                    <Image
                        src={gvm3}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-m"
                    />
                </div>
                <h3>From: Grecko vs Machine</h3>
                <div>
                    <Image
                        src={ht1}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-s"
                    />
                    <Image
                        src={ht2}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-s"
                    />
                    <Image
                        src={ht3}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-s"
                    />
                    <Image
                        src={ht4}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-s"
                    />
                </div>
                <h3>Bull from Zeri's Adventure</h3>
                <div>
                    <Image
                        src={zae2}
                        alt="kio icon"
                        quality={100}
                        className="image-box-galery-toro"
                    />
                </div>
                <h1>Environments</h1>
                <div className="env-containter">
                    <Image
                        src={env1}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                    <Image
                        src={env2}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                </div>
                <div className="env-containter">
                    <Image
                        src={env3}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                    <Image
                        src={env4}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                </div>
                <div className="env-containter">
                    <Image
                        src={env5}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                    <Image
                        src={env6}
                        alt="kio icon"
                        quality={100}
                        className="image-galery-env"
                    />
                </div>
                <h1>Extra</h1>
                <Image
                    src={extra1}
                    alt="kio icon"
                    quality={100}
                    className="image-galery-env"
                />
                <Image
                    src={extra2}
                    alt="kio icon"
                    quality={100}
                    className="image-galery-env"
                />
                <Image
                    src={extra3}
                    alt="kio icon"
                    quality={100}
                    className="image-galery-env"
                />
                <Image
                    src={extra4}
                    alt="kio icon"
                    quality={100}
                    className="image-galery-env"
                />

            </div>
        </Layout>
    )
}

export default Github;