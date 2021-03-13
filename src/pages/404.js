import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/components/Layout/Layout.module.scss';

export default function FourOhFour() {
  return (
    <>
      <Layout>
        <Link href="/">
          {/* <a> */}
          <div className={styles.header}>
            <h2>404 - Page Not Found</h2>
          </div>
          {/* </a> */}
        </Link>
      </Layout>
    </>
  );
}
