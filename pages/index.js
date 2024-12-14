import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Plaxinova</h1>
        <nav className={styles.nav}>
          <Link href="/minecraft">Minecraft Hosting</Link>
          <Link href="/rust">Rust Hosting</Link>
          <Link href="/vps">VPS Hosting</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Minecraft Hosting</h2>
          <p>Get your Minecraft server up and running in minutes! Choose from multiple plans and configurations to suit your needs.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2023 Plaxinova. All rights reserved.</p>
      </footer>
    </div>
  );
}
