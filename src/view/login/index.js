import React from 'react';
import './login.css';

export default function Login() {
    return(
        <div className="login-content d-flex align-items-center">
            <form className="form-signin text-center mx-auto">
                <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 text-white fw-bold">Login</h1>
                
                <input type="email" id="inputEmail" class="form-control my-2" placeholder="Email..." />

                <input type="password" id="inputPassword" class="form-control my-2" placeholder="Senha..." />

                <button className="w-100 btn btn-lg btn-login" type="submit">Sign in</button>

                <div className="msg-login text-white text-center my-5">
                    <span>Você está conectado!</span>
                    <br></br>
                    <span>Ops...algum errado aconteceu...verifique email/senha!</span>
                </div>

                <div className="opcoes-login mt-5">
                    <a href="#" className="mx-2">Recuperar Senha</a>
                    <span className="text-white"> | </span>
                    <a href="#" className="mx-2">Quero Cadastrar</a>
                </div>                
            </form>
        </div>        
    );
}