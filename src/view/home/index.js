import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './home.css';

import Navbar from '../../components/navbar';

import { useSelector } from 'react-redux';


export default function Home() {
    return (
        <>
            <Navbar />
            <h1> {useSelector(state => state.usuarioEmail)} </h1>
        </>
    );
}