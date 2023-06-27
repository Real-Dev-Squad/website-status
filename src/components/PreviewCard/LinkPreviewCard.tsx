import Head from 'next/head';

interface LinkPreviewCardProps {
    taskDetails: any;
    taskURL: any;
}

const LinkPreviewCard = ({ taskDetails, taskURL }: LinkPreviewCardProps) => {
    return (
        <div>
            <Head>
                <title>status site</title>
                <meta property="og:title" content={taskDetails?.title} />
                <meta
                    property="og:description"
                    content={`{purpose},\n\n assignee: ${taskDetails?.assignee} - reporter: ${taskDetails?.createdBy},\n\n `}
                />
                <meta
                    property="og:image"
                    content="https://realdevsquad.com/img/Real-Dev-Squad@1x.png"
                />
                <meta property="og:url" content={taskURL} />
                <meta property="og:type" content="website" />
            </Head>
        </div>
    );
};

export default LinkPreviewCard;
