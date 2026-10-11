import { useState, useEffect } from 'react'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Certifications from './components/Certifications.jsx'
import Exploring from './components/Exploring.jsx'
import Terminal from './components/Terminal.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [introDone])

  return (
    <div className="grain min-h-screen bg-obsidian text-ivory antialiased">
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      {introDone && (
        <>
          <Nav />
          <main id="main">
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Exploring />
            <Terminal />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
