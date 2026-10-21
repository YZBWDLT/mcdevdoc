import React from "react";
import useGlobalData from "@docusaurus/useGlobalData";
import Layout from "@theme/Layout";
import Accordion, { AccordionItem } from "../components/oreui/accordion";
import styles from "./update_log.module.css";

/**
 * 更新日志页（/update_log）。
 *
 * 内容不写在这里 —— plugins/update-log 会在构建时读取
 * update-log/YYYY-MM-DD.md（一天一个文件）并解析成结构化数据，
 * 页面只负责渲染。新增一期日志：新建当天的 md 即可。
 */

/** 2026-10-21 → 2026 年 10 月 21 日 */
function cnDate(iso) {
    const [year, month, day] = iso.split("-");
    return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}

/** 按月份分组（日期已是从新到旧，插入顺序即月份倒序） */
function groupByMonth(days) {
    const map = new Map();
    for (const day of days) {
        const key = day.date.slice(0, 7);
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(day);
    }
    return [...map.entries()].map(([key, items]) => {
        const [year, month] = key.split("-");
        return { label: `${year} 年 ${Number(month)} 月`, days: items };
    });
}

/** 极简内联渲染：`代码` / **粗体** / [文字](链接)，够用即可 */
function Inline({ text }) {
    const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = pattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        if (match[1]) {
            parts.push(<code key={key++}>{match[1]}</code>);
        } else if (match[2]) {
            parts.push(<strong key={key++}>{match[2]}</strong>);
        } else {
            parts.push(
                <a key={key++} href={match[4]}>
                    {match[3]}
                </a>,
            );
        }
        lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
}

/** 单条改动 */
function Entry({ item }) {
    return (
        <li className={styles.entry}>
            <div className={styles.entryHead}>
                {item.verb ? <span className={styles.verb}>{item.verb}</span> : undefined}
                <span className={styles.text}>
                    <Inline text={item.text} />
                </span>
            </div>
            {item.sub.length > 0 ? (
                <ul className={styles.subList}>
                    {item.sub.map((sub, index) => (
                        <li key={index} className={styles.subItem}>
                            <Inline text={sub.text} />
                        </li>
                    ))}
                </ul>
            ) : undefined}
        </li>
    );
}

export default function UpdateLogPage() {
    const data = useGlobalData()["update-log"]?.default;
    const files = data?.files ?? [];
    const [latest, ...older] = files;
    const months = groupByMonth(older);

    return (
        <Layout title="更新日志" description="记录这个站点的每一次改动。">
            <div className="page">
                <h1 className="page__title">更新日志</h1>
                <p className="page__intro">记录这个站点的每一次改动。</p>

                {latest ? (
                    <>
                        <section className="page__group">
                            <h2 className="page__groupTitle">最新更新</h2>
                            <p className="page__groupDesc">{cnDate(latest.date)} 这一期的改动。</p>

                            <div className="page__panel oreui-panel oreui-panel--light">
                                <ul className={styles.list}>
                                    {latest.items.map((item, index) => (
                                        <Entry key={index} item={item} />
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {months.length > 0 ? (
                            <section className="page__group">
                                <h2 className="page__groupTitle">过往更新</h2>
                                <p className="page__groupDesc">
                                    按月份收起，点开看当月每一天的改动。
                                </p>

                                <Accordion>
                                    {months.map(month => (
                                        <AccordionItem key={month.label} summary={month.label}>
                                            {month.days.map(day => (
                                                <div key={day.date} className={styles.day}>
                                                    <h3 className={styles.dayDate}>{cnDate(day.date)}</h3>
                                                    <ul className={styles.list}>
                                                        {day.items.map((item, itemIndex) => (
                                                            <Entry key={itemIndex} item={item} />
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </section>
                        ) : undefined}
                    </>
                ) : (
                    <section className="page__group">
                        <div className="page__panel oreui-panel oreui-panel--light">
                            <p className={styles.empty}>
                                还没有更新记录。在 <code>update-log/</code> 下新建一个
                                <code>YYYY-MM-DD.md</code> 就能开始写了。
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}
