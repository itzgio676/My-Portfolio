import { useState } from 'react';
import './App.css';

function App() {
const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <header className="header">
          <h1>Giovanni Hurtado-Salas</h1>
          <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="icon-toggle" onClick={toggleDarkMode} aria-label="Toggle Theme">
  {darkMode ? '☀️' : '🌙'}
</button>

        </header>

        <section id="hero">
          <h2>Front-End Developer</h2>
          <p>Building beautiful, responsive web experiences.</p>
        </section>

        <section id="about" className="section">
          <h2>About Me</h2>
          <p>
            I'm a passionate front-end developer who turns ideas into interactive, user-friendly websites and apps. I love working with modern JavaScript, React, and clean, accessible UI. Whether it's crafting pixel-perfect layouts or integrating APIs, I enjoy building things that people love to use.
          </p>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <p>Coming soon...</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
<div className="floating-contact">
  <a
    href="mailto:giovannijhs1@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Email"
  >
    <i className="fas fa-envelope"></i>
  </a>
  <a
    href="https://github.com/itzgio676"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <i className="fab fa-github"></i>
  </a>
  <a
    href="https://www.linkedin.com/in/giovanni-hurtado-salas-820818333"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <i className="fab fa-linkedin"></i>
  </a>
  <a
    href="tel:+17187816414"
    aria-label="Phone"
  >
    <i className="fas fa-phone"></i>
  </a>
</div>
      </section>

        <footer>
          <p>© {new Date().getFullYear()} Giovanni. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
