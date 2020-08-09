import { Component } from "react";
import Layout from "../Layout/Layout";
import styles from "./Timeline.scss";

type Props = {
  children?: React.ReactNode;
};

class Timeline extends Component<any> {
  render() {
    return (
      <Layout>
        <section id={styles.conferencetimeline}>
          <div className={styles.timelinestart}>ROADMAP</div>
          <div className={styles.conferencecenterline}></div>
          <div className={styles.conferencetimelinecontent}>
            <div className={styles.timelinearticle}>
              <div className={styles.contentleftcontainer}>
                <div className={styles.contentleft}>
                  <p>
                    Welcome
                    <span className={styles.articlenumber}>01</span>
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </div>

              <div className={styles.metadate}></div>
            </div>

            <div className={styles.timelinearticle}>
              <div className={styles.contentleftcontainer}></div>
              <div className={styles.contentrightcontainer}>
                <div className={styles.contentright}>
                  <p>
                    Members
                    <span className={styles.articlenumber}>02</span>
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </div>
              <div className={styles.metadate}></div>
            </div>

            <div className={styles.timelinearticle}>
              <div className={styles.contentleftcontainer}>
                <div className={styles.contentleft}>
                  <p>
                    Events
                    <span className={styles.articlenumber}>03</span>
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </div>

              <div className={styles.metadate}></div>
            </div>

            <div className={styles.timelinearticle}>
              <div className={styles.contentleftcontainer}></div>
              <div className={styles.contentrightcontainer}>
                <div className={styles.contentright}>
                  <p>
                    Help
                    <span className={styles.articlenumber}>04</span>
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </div>
              <div className={styles.metadate}></div>
            </div>

            <div className={styles.timelinearticle}>
              <div className={styles.contentleftcontainer}>
                <div className={styles.contentleft}>
                  <p>
                    Blogs
                    <span className={styles.articlenumber}>05</span>
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </p>
                </div>
              </div>

              <div className={styles.metadate}></div>
            </div>
          </div>
          <div className={styles.timelineend}>Thats just a beginning</div>
        </section>
      </Layout>
    );
  }
}

export default Timeline;
