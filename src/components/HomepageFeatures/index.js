import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const TutorialList = [
    {
        title: '模块1：命令',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                命令是 Minecraft 中的一种高级功能。灵活运用命令，可以简单地实现很多复杂功能。
            </>
        ),
        link: "docs/tutorials/a1_commands/b0_introduction"
    },
    {
        title: '模块2：附加包',
        image: require('@site/static/site/creeper_head.png').default,
        description: (
            <>
                附加包是 Mojang 官方支持的一种能够修改游戏运行方式的功能。它可以显著地改变你的世界。
            </>
        ),
        link: "docs/tutorials/a2_addons/b0_introduction",
    },
    {
        title: '模块3：脚本',
        image: require('@site/static/site/js.png').default,
        description: (
            <>
                脚本系统是强大的实现高度复杂功能的工具。国际版和中国版分别具有专属的脚本系统。
            </>
        ),
        link: "docs/tutorials/a3_scripts/b0_introduction",
    },
];

const DocList = [
    {
        title: '命令文档',
        image: require('@site/static/site/command_block.gif').default,
        description: (
            <>
                查看命令的文档，包括全命令汇总。
            </>
        ),
        link: "docs/docs/commands/all_commands"
    },
    {
        title: '附加包文档',
        image: require('@site/static/site/crafting_table.png').default,
        description: (
            <>
                查看附加包的基础文档，包括清单文件、世界启用包文件、行为包文件架构和资源包文件架构。
            </>
        ),
        link: "docs/docs/addons/manifest"
    },
    {
        title: '物品文档',
        image: require('@site/static/site/diamond_pickaxe.png').default,
        description: (
            <>
                查看数据驱动物品的文档，包括物品的描述、物品组件、物品贴图、物品分类等。
            </>
        ),
        link: "docs/docs/items/description"
    },
    {
        title: '方块文档',
        image: require('@site/static/site/stone.png').default,
        description: (
            <>
                查看数据驱动方块的文档，包括方块描述、方块组件和方块贴图。
            </>
        ),
        link: "docs/docs/blocks/description"
    },
    {
        title: '脚本文档',
        image: require('@site/static/site/jigsaw_block.png').default,
        description: (
            <>
                查看脚本的文档，包括 ScriptAPI。
            </>
        ),
        link: "docs/docs/scripts/sapi/world"
    },
];

const LinkList = [
    {
        title: 'nekoawa',
        description: (
            <>
                推荐！新站点，访问速度更快，基于Edgeone Pages。
            </>
        ),
        link: "https://mcdevdoc.nekoawa.com/"
    },
    {
        title: 'Cloudflare Pages',
        description: (
            <>
                旧站点，访问速度较慢，基于Cloudflare Pages。
            </>
        ),
        link: "https://yzbwdlt.pages.dev/"
    },
];

function Feature({ image, title, description, link }) {
    return (
        <div className={styles.featureWrapper}>
            <div className={styles.featureContainer}>
                <div className={styles.imageContainer}>
                    { image ? <img src={image} alt={title} className={styles.featureImage} /> : undefined }
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

                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
                    教程
                </h1>
                <p style={{ textAlign: 'center' }}>
                    查看我们精心准备的教程，帮助你零基础快速上手 Minecraft 开发！
                </p>
                <div className={styles.featuresRow}> {}
                    {TutorialList.map((props, idx) => ( <Feature key={idx} {...props} /> ))}
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
                    文档
                </h1>
                <p style={{ textAlign: 'center' }}>
                    查看我们专门整理的文档，帮助你快速查阅 Minecraft 开发中的更多接口细节。
                </p>
                <div className={styles.featuresRow}> {}
                    {DocList.map((props, idx) => ( <Feature key={idx} {...props} /> ))}
                </div>
                <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
                    本站其他链接
                </h1>
                <div className={styles.featuresRow}> {}
                    {LinkList.map((props, idx) => ( <Feature key={idx} {...props} /> ))}
                </div>
            </div>
        </section>
    );
}
