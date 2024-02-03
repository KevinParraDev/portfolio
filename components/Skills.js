import Image from "next/image";
import skillsImage from "../public/img/Skills2.png"
import skillsMovilImage from "../public/img/SkillsCel.png"

const Skills = () => {
    return (
        <div id="skills">
            <Image
                src={skillsImage}
                alt="skills"
                className="skills"
                quality={100}
            />
            <Image
                src={skillsMovilImage}
                alt="skills"
                className="skills-movil"
                quality={100}
            />
        </div>
    )
}

export default Skills;