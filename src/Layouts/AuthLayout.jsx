import React from 'react';
import Logo from '../Components/Logo/Logo';
import authImage from '../assets/authImage.png'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo />
            <section className='flex flex-col-reverse md:flex-row md:items-center'>
                <aside className='flex-1'>
                    <Outlet />
                </aside>
                <aside className='flex-1'>
                    <img src={authImage} alt="" />
                </aside>
            </section>
        </div>
    );
};

export default AuthLayout;