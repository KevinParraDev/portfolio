import Link from "next/link";

export default function Banner() {
  return (
    <div className="banner" id="home">
      <div className="welcome">
        <h2>Welcome to my portfolio</h2>
      </div>
      <h1>I&apos;M KEVIN PARRA</h1>
      <p className="banner-tagline">Indie game developer · 2D artist · Animator</p>
      <Link href="#projects" className="banner-cta">
        See my projects ↓
      </Link>
    </div>
  );
}
