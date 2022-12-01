import { FC } from "react";
import styles from "@/components/issues/Card.module.scss";

const Card: FC = (props: any) => {
  const { issue } = props;
  const created = new Date(issue.created_at).toDateString();
  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__top__details}>
          <div className={styles.card__top__details__meta_data}>
            <h2> {issue.title}</h2>
            <p>
              Opened on {created} by {issue.user.login}
            </p>
          </div>

          {/* <p className={styles.card__top__details__desc}>{issue.body}</p> */}
        </div>

        <button className={styles.card__top__button}>Convert to task</button>
      </div>
    </div>
  );
};

export default Card;
