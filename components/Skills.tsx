import Image from "next/image";
import skillsImage from "@/public/img/SkillsEn2.png";
import skillsMobileImage from "@/public/img/SkillsCelEn2.png";

export default function Skills() {
  return (
    <div id="skills">
      <Image src={skillsImage} alt="Skills" className="skills" quality={100} sizes="100vw" />
      <Image src={skillsMobileImage} alt="Skills" className="skills-movil" quality={100} sizes="100vw" />
    </div>
  );
}
