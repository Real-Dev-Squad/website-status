import React from 'react';
import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';

function ProgressLayout() {
    return (
        <>
            <NavBar/>
            <ProgressHeader/>
            <ProgressForm/>
        </>
    );
}

export default ProgressLayout;