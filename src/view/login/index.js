import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Mail, Smile, Frown } from 'react-feather';
import './login.css';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

export default function Login() {

    const [email, setEmail] = useState(); 
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();  

    const dispatch = useDispatch();

    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo('sucesso')
            setTimeout(() => {
                dispatch({type: 'LOG_IN', usuarioEmail: email});
            }, 2000);            
        }).catch(erro => {
            setMsgTipo('erro')
        });
    }   

    return(
        <div className="login-content d-flex align-items-center">

            { useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }

            <form className="form-signin text-center mx-auto">
                <Mail color="white" size={48} />
                <h1 className="h3 mb-3 text-white fw-bold">Login</h1>
                
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" class="form-control my-2" placeholder="Email..." />
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" class="form-control my-2" placeholder="Senha..." />

                <button onClick={logar} className="btn btn-lg btn-block btn-login" type="button">Logar</button>

                <div className="msg-login text-white text-center my-5">
                    {msgTipo === 'sucesso' && <span>Você está conectado! <Smile color="blue" size="24"/></span>}
                    {msgTipo === 'erro' && <span>Ops...algum errado aconteceu...verifique email/senha! <Frown color="red" size="24"/></span>}                   
                </div>
                
                <div className="opcoes-login mt-5">                
                    <Link to="/usuariorecuperarsenha" className="mx-2">Recuperar Senha</Link>
                    <span className="text-white"> | </span>
                    <Link to='novousuario' className="mx-2">Quero Cadastrar</Link>
                </div>                
            </form>
        </div>        
    );
}