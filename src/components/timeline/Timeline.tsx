import { Component } from "react";
import Layout from "../Layout/Layout";
import { TimelineItem } from "../../types/timeLine";
import styles from "./Timeline.scss";

type Props = {
  timeLineData: TimelineItem[];
};

class Timeline extends Component<Props> {
  render() {
    return (
      <Layout>
        <section id={styles.conferencetimeline}>
          <div className={styles.timelinestart}>ROADMAP</div>
          <div className={styles.conferencecenterline}></div>

          <div className={styles.conferencetimelinecontent}>
            {this.props.timeLineData.map(
              (item: TimelineItem, index: number) => {
                return (
                  <div className={styles.timelinearticle}>
                    <div
                      className={
                        index % 2 === 0
                          ? styles.contentleftcontainer
                          : styles.contentrightcontainer
                      }
                    >
                      <div
                        className={
                          index % 2 === 0
                            ? styles.contentleft
                            : styles.contentright
                        }
                      >
                        <p>
                          {item.title}
                          <span className={styles.articlenumber}>
                            {index + 1}
                          </span>
                        </p>
                        <p>{item.description}</p>
                      </div>
                    </div>

                    <div className={styles.metadate}></div>
                  </div>
                );
              }
            )}
          </div>
          <div className={styles.timelineend}>Thats just a beginning</div>
        </section>
      </Layout>
    );
  }
}

export default Timeline;
