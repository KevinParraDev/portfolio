import Image from "next/image";
import perfil from "../public/img/Perfil_D.png"
import perfil2 from "../public/img/Perfil_R.jpg"
import ReactPlayer from 'react-player'

const About = () => {
    return (
        <div id="about">
            <div className="about-container">
                <div className="image-profile-container">
                    <div className="profile-card">
                        <Image
                            src={perfil2}
                            alt="kio icon"
                            className="face profile-image"
                        />
                        <Image
                            src={perfil}
                            alt="kio icon"
                            className="face profile-image-back   "
                        />
                    </div>
                </div>
                <div>
                    <h1 className="subtitulo">About Me</h1>
                    <p>I am a passionate video game developer interested in both art and programming. I have dedicated my career to indie game development using the Unity game engine and various design programs.
                    </p>
                    <br />
                    <p>Currently, I am studying Systems Engineering and Computer Science at the National University of Colombia. I am a teaching assistant for the Multimedia Creation course and I am also part of the Turing Box student group, where I serve as the leader of the video game creation node.</p>

                </div>
            </div>
            {/* <h1 className="subtitulo">Reel</h1>
            <div className="contenedor-reel">
                <div className="reel">
                    <ReactPlayer url='https://www.youtube.com/watch?v=eDbnl1O5HIs'
                        loop
                        controls
                        width={"100%"}
                        height={"100%"}
                        style={{
                            margin: "auto",
                        }}
                    />
                </div>
            </div> */}


        </div>
    )
}

export default About;