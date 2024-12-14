import Link from 'next/link';
import styles from '../styles/Home.module.css';

const MinecraftPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Minecraft Hosting</h1>
        <Link href="/">Home</Link>
      </header>
      <main className={styles.main}>
        <p>Get your Minecraft server up and running in minutes! Choose from multiple plans and configurations to suit your needs.</p>
        <ul>
          <li>RAM packages up to 32GB</li>
          <li>Instant setup</li>
          <li>Access to modpacks and plugins</li>
          <li>24/7 support</li>
        </ul>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 Plaxinova. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MinecraftPage;
