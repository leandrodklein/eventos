import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'react-feather';

import './navbar.css';

import { useSelector, useDispatch } from 'react-redux';

export default function Navbar() {

    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <span className="navbar-brand text-white fw-bold">Eventos</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <Menu className="navbar-toggler-icon text-white" />
                    </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

                        {
                            useSelector(state => state.usuarioLogado) > 0 ?

                            <>
                                <li className="nav-item"><Link className="nav-link" to="eventocadastro">Publicar Evento</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="">Meus Eventos</Link></li>
                                <li className="nav-item"><Link className="nav-link" onClick={() => dispatch({type: 'LOG_OUT'})}>Sair</Link></li>
                            </>
                            :
                            <>
                                <li className="nav-item"><Link className="nav-link" to="novousuario">Cadastrar</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="login">Login</Link></li>
                            </>                        
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
}