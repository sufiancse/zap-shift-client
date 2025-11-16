import React from 'react';

import logo from '../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={"/"}>
            <div className='relative'>
                <img src={logo} alt="" />
                <h1 className='font-bold text-2xl absolute bottom-0  left-6 '>ZapShift</h1>
            </div>
        </Link>
    );
};

export default Logo;