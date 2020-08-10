import { TimelineItem } from "../../types/timeLine";
import styles from "./TimelineItem.scss";

type Props = {
  timelineItem: TimelineItem;
  index: number;
};

function DiaplayTimelineItem(props: Props) {
  const { timelineItem, index } = props;

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
          className={index % 2 === 0 ? styles.contentleft : styles.contentright}
        >
          <p>
            {timelineItem.title}
            <span className={styles.articlenumber}>{index + 1}</span>
          </p>
          <p>{timelineItem.description}</p>
        </div>
      </div>

      <div className={styles.metadate}></div>
    </div>
  );
}

export default DiaplayTimelineItem;
