import { Component } from "react";
import DiaplayTimelineItem from "../TimelineItem/TimelineItem";
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
                  <DiaplayTimelineItem timelineItem={item} index={index} />
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
