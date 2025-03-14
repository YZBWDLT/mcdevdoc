import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
    {
        title: '命令1',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and
                used to get your website up and running quickly.
            </>
        ),
        link: "docs/commands/a"
    },
    {
        title: '命令2',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and
                used to get your website up and running quickly.
            </>
        ),
    },
    {
        title: '命令3',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and
                used to get your website up and running quickly.
            </>
        ),
    },
    {
        title: '命令4',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and
                used to get your website up and running quickly.
            </>
        ),
    },
    {
        title: '命令5',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                Docusaurus was designed from the ground up to be easily installed and
                used to get your website up and running quickly.
            </>
        ),
    },
];


function Feature({ image, title, description, link }) {
    return (
        <div className={styles.featureWrapper}>
            <div className={styles.featureContainer}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={title} className={styles.featureImage} />
                </div>
                <div className={styles.textContainer}>
                    <Heading as="h2">
                        { link ? ( <Link to={link}>{title}</Link> ) : ( <span className={styles.noLink}>{title}</span> )}
                    </Heading>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresRow}> {/* 新增 featuresRow */}
            {FeatureList.map((props, idx) => ( <Feature key={idx} {...props} /> ))}
          </div>
        </div>
      </section>
    );
  }
