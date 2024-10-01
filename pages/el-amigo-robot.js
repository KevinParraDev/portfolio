import Layout from "../components/Layout";
import Image from "next/image";
import kio1 from "../public/img//projects/mdfP.png"
import kio2 from "../public/img//projects/zeri2.png"
import kio3 from "../public/img//projects/zeri3.png"
import kioV from "../public/img//projects/zeriV.png"
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
import Link from "next/link";

const Github = () => {
    const [activeImage, setActiveImage] = useState(0)

    const handleScreenshot = (value) => {
        setActiveImage(value)
    }

    const screenshots = [kioV, kio1, kio2, kio3];

    return (
        <Layout>
            <div className="game">
                <h1>El Amigo Robot</h1>
                <h2>Animated Short</h2>
                <div className="game-box">
                    <div>
                        <div className="video">
                            <ReactPlayer url='https://www.youtube.com/watch?v=-6xzjc_b_4U'
                                loop
                                controls
                                width={"100%"}
                                height={"100%"}
                            />
                        </div>
                    </div>
                    <div>
                        <h2>Description</h2>
                        <p>"El Amigo Robot" is an animated short film that explores the bond between a robot and a stray cat. The goal of this piece is to show how an apparently inanimate being can develop empathy and care for another living creature. The short film was produced with the intention of experimenting with visual storytelling and emotions, using modern technology to bring the story to life.</p>

                        <h2>Roles</h2>
                        <p>• Animator <br /> • Storyboard <br /> • Desing</p>
                        {/* <h2>Play Now!</h2>
                        <a className="link" target="_blank" href="https://kevin-parra.itch.io/zeris-adventure">Itch.io</a>
                        <h2>Repository</h2>
                        <a className="link" target="_blank" href="https://github.com/KevinParraDev/Zeri-s-Adventure">Github.com</a> */}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Github;