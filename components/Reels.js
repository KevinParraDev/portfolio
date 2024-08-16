import Link from "next/link";
import Image from "next/image";
import kio from "../public/img//projects/kio.png"
import zeri from "../public/img//projects/zeri.png"
import surviveBird from "../public/img//projects/surviveBird1.png"
import grecko from "../public/img//projects/grecko1.png"
import domino from "../public/img//projects/domino1.png"
import hamster from "../public/img//projects/hamster1.png"
import ReactPlayer from 'react-player'

const Reels = () => {
    return (
        <div>
            <h1 className="subtitulo">Reels</h1>

            <div className="contenedor-reel">
                <div className="videos-proyectos">
                    <div>
                        <h2 className="subtitulo-videos">Game Development</h2>
                        <div className="reel">
                            <ReactPlayer url='https://vimeo.com/999400663?share=copy'
                                loop
                                controls
                                width={"100%"}
                                height={"100%"}
                                style={{
                                    margin: "auto",
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="subtitulo-videos">Animation</h2>
                        <div className="reel">
                            <ReactPlayer url='https://vimeo.com/999399984?share=copy'
                                loop
                                controls
                                width={"100%"}
                                height={"100%"}
                                style={{
                                    margin: "auto",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reels;