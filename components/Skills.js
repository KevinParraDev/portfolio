import Image from "next/image";
import skillsImage from "../public/img/SkillsEn2.png"
import skillsMovilImage from "../public/img/SkillsCelEn2.png"

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