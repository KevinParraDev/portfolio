import Image from "next/image";
import skillsImage from "../public/img/SkillsEn.png"
import skillsMovilImage from "../public/img/SkillsCelEn.png"

const GaleryHome = () => {
    return (
        <div id="galery">
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

export default GaleryHome;