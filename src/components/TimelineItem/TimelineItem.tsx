import { TimelineItem } from "../../types/timeLine";
import styles from "./TimelineItem.scss";
import useVisibility from "../../helpers/check-visibility.helper";

type Props = {
  timelineItem: TimelineItem;
  index: number;
};

function DiaplayTimelineItem(props: Props) {
  const [isFirstVisible, firstRef] = useVisibility<HTMLDivElement>(-100);
  const { timelineItem, index } = props;

  return (
    <div ref={firstRef}>
      <div
        className={
          index < 2
            ? styles.timelinearticleVisible
            : isFirstVisible
            ? styles.timelinearticleVisible
            : styles.timelinearticle
        }
      >
        <div
          className={
            index % 2 === 0
              ? styles.contentleftcontainer
              : styles.contentrightcontainer
          }
        >
          <div
            className={
              index % 2 === 0 ? styles.contentleft : styles.contentright
            }
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
    </div>
  );
}

export default DiaplayTimelineItem;
