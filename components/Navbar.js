import Link from "next/link";
import Image from "next/image";
import githubIcon from "../public/img/githubIcon.png"
import instagramIcon from "../public/img/instagramIcon.png"
import linkedinIcon from "../public/img/linkedinIcon.png"
import contactIcon from "../public/img/contact.png"
import { useEffect, useState } from "react";

const Navbar = () => {
    const [showMovileMenu, setShowMovileMenu] = useState(false)
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        console.log(value)
        setActiveLink(value);
        handleMovileMenu(false)
    }

    const handleMovileMenu = (e) => {
        setShowMovileMenu(e)
    }

    return (
        <div className={scrolled ? "navbar scrolled" : "navbar"}>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link
                            href="/#home"
                            className={activeLink === 'home' ? 'active' : ''} onClick={() => onUpdateActiveLink('home')}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#skills"
                            className={activeLink === 'skills' ? 'active' : ''} onClick={() => onUpdateActiveLink('skills')}
                        >
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#projects"
                            className={activeLink === 'projects' ? 'active' : ''} onClick={() => onUpdateActiveLink('projects')}
                        >
                            Projects
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="nav-buttons">
                <Link href="https://github.com/KevinParraDev?tab=repositories" className="nav-icon" target="_blank">
                    <Image
                        src={githubIcon}
                        alt="Github icon"
                        className="nav-image"
                    />
                </Link>
                <Link href="https://www.instagram.com/kevinparra_dev/" className="nav-icon" target="_blank">
                    <Image
                        src={instagramIcon}
                        alt="Instagram icon"
                        className="nav-image"
                    />
                </Link>
                <Link href="https://www.linkedin.com/in/kevin-santiago-parra/" className="nav-icon" target="_blank">
                    <Image
                        src={linkedinIcon}
                        alt="Linkedin icon"
                        className="nav-image"
                    />
                </Link>
            </div>
            <div className="contactame">
                <Link href="/galery" className="nav-icon">
                    GALERY
                </Link>
            </div>

            <div className="menu" onClick={() => handleMovileMenu(true)}>Menu</div>
            <div className={showMovileMenu ? "overlay" : "overlay-close"}>
                <div className="close" onClick={() => handleMovileMenu(false)}>Close</div>
                <div className="overlay-content">
                    <Link href="/#home"
                        className={activeLink === 'home' ? 'active' : ''} onClick={() => onUpdateActiveLink('home')}>
                        Home
                    </Link>
                    <Link href="/#skills"
                        className={activeLink === 'skills' ? 'active' : ''} onClick={() => onUpdateActiveLink('skills')}>
                        Skills
                    </Link>
                    <Link href="/#projects"
                        className={activeLink === 'projects' ? 'active' : ''} onClick={() => onUpdateActiveLink('projects')}>
                        Projects
                    </Link>
                    <Link href="/#contact" className="nav-icon">
                        LET'S CONTACT
                    </Link>
                    <div className="overlay-nav-buttons">
                        <Link href="https://github.com/KevinParraDev?tab=repositories" className="nav-icon" target="_blank">
                            <Image
                                src={githubIcon}
                                alt="Github icon"
                                className="nav-image"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/kevinparra_dev/" className="nav-icon" target="_blank">
                            <Image
                                src={instagramIcon}
                                alt="Instagram icon"
                                className="nav-image"
                            />
                        </Link>
                        <Link href="https://www.linkedin.com/in/kevin-santiago-parra/" className="nav-icon" target="_blank">
                            <Image
                                src={linkedinIcon}
                                alt="Linkedin icon"
                                className="nav-image"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar;