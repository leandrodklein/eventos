import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Smile, Frown } from 'react-feather';
import './evento-cadastro.css';
import Navbar from '../../components/navbar';
import firebase from '../../config/firebase';
import 'firebase/auth';

export default function EventoCadastro(props) {

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [foto, setFoto] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = firebase.storage();
    const db = firebase.firestore();    

    useEffect(() => {        
        if(props.match.params.id) {
            firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)
                setTipo(resultado.data().tipo)
                setDetalhes(resultado.data().detalhes)
                setData(resultado.data().data)
                setHora(resultado.data().hora) 
                setFotoAtual(resultado.data().foto)
            })  
        } 
    },[carregando])

    function atualizar() {
        setMsgTipo(null);
        setCarregando(1);
        
        if(fotoNova)
        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
            db.collection('eventos').doc(props.match.params.id).update({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                foto: fotoNova ? fotoNova.name : fotoAtual            
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
        });    
}

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
            db.collection('eventos').add({
                titulo: titulo,
                tipo: tipo,
                detalhes: detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
        });
    });
}

    return (
        <>
            <Navbar />
            
            <div className="col-12 container mt-3">
                <div className="row">
                    <h3 className="mx-auto fw-bold text-center">{props.match.params.id ? 'Atualizar Evento' : 'Novo Evento'}</h3>
                </div>

                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo} />
                    </div>

                    <div className="form-group">
                        <label>Tipo do Evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={tipo && tipo} >
                            <option disabled selected value>-- Selecione o tipo do evento --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Descrição do Evento:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" rows="3" value={detalhes && detalhes} />
                    </div>

                    <div className="form-group row">
                        <div className="col-6">
                            <label>Data:</label>
                            <input onChange={(e) => setData(e.target.value)} type="date" className="form-control" value={data && data} />
                        </div>

                        <div className="col-6">
                            <label>Hora:</label>
                            <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={hora && hora} />
                        </div>                        
                    </div>

                    <div className="form-group">
                        <label>Upload da Imagem {props.match.params.id ? '(caso queira deixar a mesma não precisa incluir novamente)' : null } </label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control" />
                    </div>

                    <div className="row">
                    {   
                        carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="visually-hidden">Loading...</span></div>
                        : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">{props.match.params.id ? 'Atualizar Evento' : 'Publicar Evento'}</button>
                    }                       
                    </div>                    
                                        
                </form>

                <div className="msg-login text-center mt-2">
                    {msgTipo === 'sucesso' && <span> Evento Publicado! <Smile color="blue" size="24"/></span>}
                    {msgTipo === 'erro' && <span>Ops...não foi possível publicar o evento! <Frown color="red" size="24"/></span>}                   
                </div>
            </div>
        </>        
    );
}