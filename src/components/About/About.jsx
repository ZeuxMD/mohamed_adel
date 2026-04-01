import styles from "./About.module.css";

function About({ refProps }) {
  return (
    <section ref={refProps} className={`${styles.about} breakout`} id="about">
      <h2>{"> About Me"}</h2>
      <div className={styles.aboutContent}>
        <img
          src="https://4swr9auxnu.ufs.sh/f/qomDrNVG6cxziQjePRkJMbV20oEYr41S8LUg3C9nGdHJwR7a"
          alt="Mohamed Adel working at a laptop"
          className={styles.aboutImage}
          width="640"
          height="800"
          loading="lazy"
          decoding="async"
        />
        <div className={styles.aboutText}>
          <p>
            Hi, I&apos;m Mohamed, a passionate full-stack developer based in
            Alexandria, Egypt.
          </p>
          <p>
            My journey with computers began at the age of 9 when I discovered{" "}
            <strong>video games</strong>, and it was my first spark of fascination
            with technology. By 13, I was hooked on programming when I joined a{" "}
            <strong>FIRST LEGO League</strong> team, coding tiny robots to complete
            missions. A few years later I started to learn coding and I picked web
            development because I believed it was one of the more impactful fields
            where I can build something that benefits people, and I try to learn
            more every day so I can achieve that goal.
          </p>
          <ul className={styles.skillsList}>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
