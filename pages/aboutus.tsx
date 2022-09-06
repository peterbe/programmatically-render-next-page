import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const AboutUs: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us page</title>
        <meta name="description" content="We do things. I hope." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About Use page</h1>

        <p className={styles.description}>
          <Link href="/">
            <a>
              Go to the <b>Home</b> page
            </a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <Link href="/">Home page</Link>
      </footer>
    </div>
  );
};

export default AboutUs;
