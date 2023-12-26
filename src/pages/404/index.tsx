import Layout from '@/components/Layout';
import styles from '@/pages/404/404.module.scss';
import Image from 'next/image';

export default function PageNotFound() {
    return (
        <Layout>
            <div className={styles.notFound}>
                <Image
                    src="/not-found.png"
                    alt="404 - Page Not Found"
                    width={500}
                    height={500}
                    className={styles.notFoundImage}
                />
                <h2 className={styles.notFoundText}>404 - Page Not Found</h2>
            </div>
        </Layout>
    );
}
