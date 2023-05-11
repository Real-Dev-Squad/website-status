import { useRouter } from 'next/router';
import React from 'react';
import PageNotFound from '../404';
import DashboardLayout from '@/components/Dashboard/DashboardLayout';

const DashboardPage = () => {
    const router = useRouter();

    const { dev } = router.query;

    if (dev !== 'true') {
        return <PageNotFound />;
    }
    return <DashboardLayout />;
};

export default DashboardPage;
