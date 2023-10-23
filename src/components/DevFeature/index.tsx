import React from 'react';
import { useRouter } from 'next/router';
type props = {
    children: React.ReactNode;
};

export default function DevFeature({ children }: props) {
    const router = useRouter();
    const { dev } = router.query;
    if (dev !== 'true') {
        return <></>;
    }
    return <>{children}</>;
}
