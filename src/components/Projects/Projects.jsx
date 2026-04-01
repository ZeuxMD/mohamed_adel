import styles from "./Projects.module.css";

const projects = [
  {
    id: 1,
    title: "Qetmeer Farm",
    description: "ECommerce website for selling farm products",
    imageUrl: "https://4swr9auxnu.ufs.sh/f/qomDrNVG6cxz0OrdkPjUwhHlkcWA21BPbDsnfIeFCNgj8ypi",
    tech: ["Next.js", "Tailwindcss", "Supabase"],
    liveUrl: "https://qetmeer-farm.vercel.app/",
    githubUrl: "https://github.com/ZeuxMD/qetmeer_farm"
  },
  {
    id: 2,
    title: "ZDrive",
    description: "Minimal Google Drive Clone with t3 Stack, with a database, auth, and analytics. This was done (mostly) following a tutorial from the youtuber Theo - t3.gg",
    imageUrl: "https://4swr9auxnu.ufs.sh/f/qomDrNVG6cxzlJvoeBwWEB2s7JPvAVobcO45y8QaK6nFNjS1",
    tech: ["Next.js", "Typescript", "Tailwindcss", "Clerk", "Singlestore", "Posthog"],
    liveUrl: "https://drive-tutorial-zmd.netlify.app/",
    githubUrl: "https://github.com/ZeuxMD/drive-tutorial"
  },
  {
    id: 3,
    title: "MemoHadith",
    description: "Fast and light weight Hadith application for reading and memorizing Hadith (PWA)",
    imageUrl: "https://4swr9auxnu.ufs.sh/f/qomDrNVG6cxzI2X63AC7cAEv1whJ4VzI3OKHLa0NmoQXGspq",
    tech: ["HTML", "CSS", "Typescript", "Service-Workers", "IndexedDB"],
    liveUrl: "https://zeuxmd.github.io/memohadith",
    githubUrl: "https://github.com/ZeuxMD/memohadith"
  }
];
// TODO: add carousel, and multiple images following the mouse that appear on project hover, showcasing different aspects of the project
function Projects({ refProps }) {
  return (
    <section ref={refProps} className={`${styles.projects} full-width`}>
      <h2>{"> Projects"}</h2>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <img src={project.imageUrl} alt={project.title} />
            <div className={styles.descriptionContainer}>

              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.techStack}>
                {project.tech.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))
                }
              </div>
            </div>
            <div className={styles.projectLinks}>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{"Live Demo"}</a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">{"GitHub"}</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
