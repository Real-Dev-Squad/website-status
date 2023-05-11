import React from 'react';
import NavBar from '../navBar';
import Searchbar from './Searchbar';

function DashboardLayout() {
    return (
        <>
            <NavBar />
            <Searchbar label={'users'} />
        </>
    );
}

export default DashboardLayout;
