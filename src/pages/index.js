import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className="container">
                <Heading as="h1" className={styles.heroTitle}>
                    {siteConfig.title}
                </Heading>
                <p className={styles.heroSubtitle}>
                    {siteConfig.tagline}
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="btn green_btn large_btn"
                        to="/docs/tutorials/a1_commands/b0_introduction">
                        开始学习
                    </Link>
                    <Link
                        className="btn normal_btn large_btn"
                        to="/blog">
                        个人博客
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title={`主页`} description={siteConfig.tagline}>
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
