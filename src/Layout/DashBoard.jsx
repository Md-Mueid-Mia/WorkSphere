import { Sidebar } from 'primereact/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div>
            <div>
            <Sidebar></Sidebar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;