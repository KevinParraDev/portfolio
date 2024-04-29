import Image from "next/image";
import perfil from "../public/img/Perfil.png"

const About = () => {
    return (
        <div id="about">
            <div className="about-container">
                <Image
                    src={perfil}
                    alt="kio icon"
                    className="profile-image"
                />
                <div>
                    <h1 className="subtitulo">About Me</h1>
                    <p>I am a passionate video game developer interested in both art and programming. I have dedicated my career to indie game development using the Unity game engine and various design programs.
                    </p>
                    <br />
                    <p>Currently, I am studying Systems Engineering and Computer Science at the National University of Colombia. I am a teaching assistant for the Multimedia Creation course and I am also part of the Turing Box student group, where I serve as the leader of the video game creation node.</p>
                </div>
            </div>
        </div>
    )
}

export default About;