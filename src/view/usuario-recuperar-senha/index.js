import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Smile, Frown } from 'react-feather';
import './usuario-recuperar-senha.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import Navbar from '../../components/navbar'

export default function UsuarioRecuperarSenha() {
    return (
        <>
            <Navbar />
        </>
    );
}