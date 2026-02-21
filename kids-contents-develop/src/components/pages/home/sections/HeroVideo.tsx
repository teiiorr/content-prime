import Link from "next/link";
import styles from "./HeroVideo.module.scss";

type HeroVideoProps = {
  showActions?: boolean;
};

export function HeroVideo({ showActions = false }: HeroVideoProps) {
  return (
    <section className={styles.hero} aria-label="Hero background video section">
      <video
        className={styles.hero__video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className={styles.hero__overlay} aria-hidden="true" />
      <div className={styles.hero__light} aria-hidden="true" />
      <div className={styles.hero__fade} aria-hidden="true" />

      {showActions && (
        <div className={styles.hero__actions}>
          <Link href="/news" className={styles.hero__button}>
            News
          </Link>
          <Link href="/creative-contests" className={styles.hero__button}>
            Contests
          </Link>
        </div>
      )}
    </section>
  );
}
