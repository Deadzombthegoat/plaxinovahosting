import Link from 'next/link';
import styles from '../styles/Home.module.css';

const RustPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Rust Hosting</h1>
        <Link href="/">Home</Link>
      </header>
      <main className={styles.main}>
        <p>Enjoy lag-free Rust gameplay with our high-performance Rust servers. Perfect for solo or group play!</p>
        <ul>
          <li>Optimized for performance</li>
          <li>Custom configurations</li>
          <li>Complete control with FTP access</li>
          <li>24/7 support</li>
        </ul>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 Plaxinova. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RustPage;
