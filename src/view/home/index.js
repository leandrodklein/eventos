import React from 'react';
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