import styles from "./Projects.module.css";

const projects = [
    {
        id: 1,
        title: "Qetmeer Farm",
        description: "ECommerce website for selling farm products",
        imageUrl: "./images/qetmeer.png", // Replace with actual image
        tech: ["Next.js", "Tailwindcss", "Supabase"],
        liveUrl: "https://qetmeer-farm.vercel.app/",
        githubUrl: "https://github.com/MohamedAdelMohamedMetwaley/qetmeer_farm"
    },
    {
        id: 2,
        title: "ZDrive",
        description: "Minimal Google Drive Clone with t3 Stack, with a database, auth, and analytics. This was done (mostly) following a tutorial from the youtuber Theo - t3.gg",
        imageUrl: "./images/zdrive.png", // Replace with actual image
        tech: ["Next.js", "Typescript", "Tailwindcss", "Clerk", "Singlestore", "Posthog"],
        liveUrl: "https://drive-tutorial-zmd.netlify.app/",
        githubUrl: "https://github.com/MohamedAdelMohamedMetwaley/drive-tutorial"
    },
    {
        id: 3,
        title: "MemoHadith",
        description: "A simple website that contains a collection of Hadith books to help memorize and read hadith",
        imageUrl: "./images/memohadith.png", // Replace with actual image
        tech: ["HTML", "CSS", "Javascript"],
        liveUrl: "https://mohamedadelmohamedmetwaley.github.io/memohadith",
        githubUrl: "https://github.com/MohamedAdelMohamedMetwaley/memohadith"
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
