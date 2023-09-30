import { FC } from 'react';
import Head from 'next/head';

type CustomHeadProps = {
    title: string;
};

const CustomHead: FC<CustomHeadProps> = ({ title }) => (
    <Head>
        <title>{`${title} | Status Real Dev Squad`}</title>
        <link rel="shortcut icon" href="RDSLogo.png" type="image/x-icon" />
    </Head>
);

export default CustomHead;
