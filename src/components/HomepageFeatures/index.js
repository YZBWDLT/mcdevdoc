import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
    {
        title: '模块1：命令',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                命令是 Minecraft 中的一种高级功能。灵活运用命令，可以简单地实现很多复杂功能。
            </>
        ),
        link: "docs/commands/introduction"
    },
    {
        title: '模块2：附加包基础',
        image: require('@site/static/site/grass_block.png').default,
        description: (
            <>
                附加包是 Mojang 官方支持的一种能够修改游戏运行方式的功能。它可以显著地改变你的世界。
            </>
        ),
        link: "docs/addons_simple/introduction",
    },
    {
        title: '模块3：附加包进阶',
        image: require('@site/static/site/creeper_head.png').default,
        description: (
            <>
                了解附加包所能够实现的更加强大的功能，联合运用行为包和资源包改变世界。
            </>
        ),
        link: "docs/addons_complex/introduction",
    },
    {
        title: '模块4：中国版',
        image: require('@site/static/site/china_edition.png').default,
        description: (
            <>
                了解中国版所具有的一些独特命令和附加包功能。
            </>
        ),
        link: "docs/china_version/introduction",
    },
    {
        title: '模块5：ScriptAPI',
        image: require('@site/static/site/js.png').default,
        description: (
            <>
                ScriptAPI（又称SAPI）是一种国际版的脚本系统，是强大的实现高度复杂功能的工具。
            </>
        ),
        link: "docs/sapi/introduction",
    },
    {
        title: '模块6：ModAPI',
        image: require('@site/static/site/python.png').default,
        description: (
            <>
                ModAPI是一种适用于中国版的脚本系统，也是一种强大的实现高度复杂功能的工具。
            </>
        ),
        link: "docs/modapi/introduction",
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
