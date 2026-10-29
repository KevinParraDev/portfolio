"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import githubIcon from "@/public/img/githubIcon.png";
import instagramIcon from "@/public/img/instagramIcon.png";
import linkedinIcon from "@/public/img/linkedinIcon.png";

const RESUME_URL = "https://drive.google.com/file/d/1Tm-eH6K-VsQhFa5zZZ3BZuEEi7UQwZ2G/view?usp=sharing";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About Me" },
];

const socials = [
  { href: "https://github.com/KevinParraDev?tab=repositories", icon: githubIcon, label: "GitHub" },
  { href: "https://www.instagram.com/kevinparra_dev/", icon: instagramIcon, label: "Instagram" },
  { href: "https://www.linkedin.com/in/kevin-santiago-parra/", icon: linkedinIcon, label: "LinkedIn" },
];

function SocialLinks() {
  return socials.map(({ href, icon, label }) => (
    <a key={label} href={href} className="nav-icon" target="_blank" rel="noopener noreferrer">
      <Image src={icon} alt={`${label} icon`} className="nav-image" />
    </a>
  ));
}

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
    setShowMobileMenu(false);
  };

  const sectionLinks = sections.map(({ id, label }) => (
    <Link
      key={id}
      href={`/#${id}`}
      className={activeLink === id ? "active" : ""}
      onClick={() => onUpdateActiveLink(id)}
    >
      {label}
    </Link>
  ));

  return (
    <div className={scrolled ? "navbar scrolled" : "navbar"}>
      <nav>
        <ul className="nav-links">
          {sectionLinks.map((link) => (
            <li key={link.key}>{link}</li>
          ))}
        </ul>
      </nav>
      <div className="nav-buttons">
        <SocialLinks />
      </div>
      <div className="right-buttons">
        <a href={RESUME_URL} className="contactame" target="_blank" rel="noopener noreferrer">
          RESUME
        </a>
        <Link href="/gallery" className="contactame">
          GALLERY
        </Link>
      </div>

      <button type="button" className="menu" onClick={() => setShowMobileMenu(true)}>
        Menu
      </button>
      <div className={showMobileMenu ? "overlay" : "overlay-close"}>
        <button type="button" className="close" onClick={() => setShowMobileMenu(false)}>
          Close
        </button>
        <div className="overlay-content">
          {sectionLinks}
          <Link href="/gallery" onClick={() => setShowMobileMenu(false)}>
            Gallery
          </Link>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <div className="overlay-nav-buttons">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
