import { useState } from "react";
import Swal from "sweetalert2";
import ShadowButton from "../ShadowButton/ShadowButton";
import styles from "./Contact.module.css";

const ACCESS_KEY = "739cad87-68d8-4c8a-a609-064cd75c1255";
const CONTACT_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL = "mohamedadelzmd@gmail.com";

function Contact({ refProps }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? "The contact request could not be completed.");
      }

      await Swal.fire({
        title: "Message sent",
        text: "Thanks for reaching out. I’ll reply as soon as possible.",
        icon: "success",
        confirmButtonColor: "#17d885",
      });
      form.reset();
    } catch (error) {
      await Swal.fire({
        title: "Message not sent",
        text: `There was a problem sending your message. Please try again or email ${EMAIL} directly.`,
        icon: "error",
        confirmButtonColor: "#17d885",
      });
      console.error("Contact form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`${styles.contact} breakout`} ref={refProps} id="contact">
      <h2>{"> Contact Me"}</h2>
      <div className={styles.contactShell}>
        <div className={styles.contactIntro}>
          <p>
            If you have a project, role, or idea worth discussing, send a note.
            I usually reply by email.
          </p>
          <a className={styles.directLink} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <div className={styles.inputBox}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                className={styles.field}
                name="name"
                autoComplete="name"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                className={styles.field}
                name="email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className={`${styles.field} ${styles.messageField}`}
              required
            />
            <input
              type="hidden"
              name="subject"
              value="New message from your website's contact form."
            />
          </div>

          <div className={styles.actions}>
            <ShadowButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </ShadowButton>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
