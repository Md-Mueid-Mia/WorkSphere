import React from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;