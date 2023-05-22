import { useRouter } from 'next/router';
import React from 'react';
import PageNotFound from '../404';
import NavBar from '@/components/navBar';
import Searchbar from '@/components/Dashboard/Searchbar';

const search = (query: string) => {
    const searchValues = query.split(',');
    console.log('Searching', searchValues);
};

const DashboardPage = () => {
    const router = useRouter();

    const { dev } = router.query;

    if (dev !== 'true') {
        return <PageNotFound />;
    }
    return (
        <>
            <NavBar />
            <Searchbar label="Users" />
        </>
    );
};

export default DashboardPage;
