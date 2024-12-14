import Link from 'next/link';
import styles from '../styles/Home.module.css';

const VpsPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>VPS Hosting</h1>
        <Link href="/">Home</Link>
      </header>
      <main className={styles.main}>
        <p>Deploy your own applications with our powerful VPS hosting solutions. Ideal for developers and advanced users.</p>
        <ul>
          <li>Fully customizable environment</li>
          <li>SSD storage for faster performance</li>
          <li>Scalable resources</li>
          <li>24/7 premium support</li>
        </ul>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 Plaxinova. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VpsPage;
