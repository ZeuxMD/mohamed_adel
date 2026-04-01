import Header from "./components/Header/Header";
import Projects from "./components/Projects/Projects";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import PageLoad from "./components/PageLoad/PageLoad";
import { useEffect, useRef, useState } from "react";

function App() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const visibilityBySection = new Map();
    const sections = [
      { id: "home", element: homeRef.current },
      { id: "projects", element: projectsRef.current },
      { id: "about", element: aboutRef.current },
      { id: "contact", element: contactRef.current },
    ].filter((section) => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibilityBySection.set(entry.target.id, entry.intersectionRatio);
            return;
          }

          visibilityBySection.delete(entry.target.id);
        });

        const [nextActiveSection] = [...visibilityBySection.entries()].sort(
          (left, right) => right[1] - left[1],
        )[0] ?? [];

        if (nextActiveSection) {
          setActiveSection(nextActiveSection);
        }
      },
      {
        rootMargin: "-18% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7, 0.85],
      },
    );

    sections.forEach((section) => observer.observe(section.element));

    return () => observer.disconnect();
  }, []);

  function handleNavigate(ref, sectionId) {
    if (!ref.current) {
      return;
    }

    setActiveSection(sectionId);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const sections = [
    { id: "home", label: "Home", ref: homeRef },
    { id: "projects", label: "Projects", ref: projectsRef },
    { id: "about", label: "About me", ref: aboutRef },
    { id: "contact", label: "Contact", ref: contactRef },
  ];

  return (
    <>
      <PageLoad />
      <Navbar
        activeSection={activeSection}
        handleNavigate={handleNavigate}
        sections={sections}
      />
      <Header
        refProps={homeRef}
        projectsRef={projectsRef}
        projectsSectionId="projects"
        handleNavigate={handleNavigate}
      />
      <Projects refProps={projectsRef} />
      <About refProps={aboutRef} />
      <Contact refProps={contactRef} />
    </>
  );
}

export default App;
