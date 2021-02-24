import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Archive, Calendar, Clock, Edit, Eye } from 'react-feather';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar';
import './evento-detalhes.css';

export default function EventoDetalhes(props) {

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);

    useEffect(() => {
        firebase.firestore().collection('eventos').doc(props.match.params.id).get().then(resultado => {
            setEvento(resultado.data())
            firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });
        });
    })

    return (
        <>
            <Navbar />

            <div className="container-fluid">

                {

                    carregando ? <div className="row">
                                    <div className="spinner-border text-danger mx-auto mt-5" role="status"><span class="visually-hidden"></span></div>
                                </div>
                                
                    :

                    <div>
                        <div className="row">
                            <img src={urlImg} className="img-banner" alt="banner" />

                            <div className="col-12 float-right mt-1 visualizacoes"><Eye /> <span>{evento.visualizacoes}</span></div>
                            <h3 className="text-center mt-5 titulo"><strong>{evento.titulo}</strong></h3>
                        </div>

                        <div className="row mt-5 d-flex justify-content-around">
                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <Archive />
                                <h5><strong>Tipo</strong></h5>
                                <span className="mt-3">{evento.tipo}</span>
                            </div>

                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <Calendar />
                                <h5><strong>Data</strong></h5>
                                <span className="mt-3">{evento.data}</span>
                            </div>

                            <div className="col-md-3 col-sm-12 box-info p-3 my-2">
                                <Clock />
                                <h5><strong>Hora</strong></h5>
                                <span className="mt-3">{evento.hora}</span>
                            </div>
                        </div>     

                        <div className="row box-detalhes mt-5">
                            <div className="col-12 text-center">
                                <h5><strong>Detalhes do Evento</strong></h5>
                            </div>
                            <div className="col-12 text-center">
                                <p>{evento.detalhes}</p>
                            </div>                    
                        </div>        

                        {
                            usuarioLogado == evento.usuario ?
                            <Link to="/" className="btn-editar"><Edit size="40" /></Link>
                            : ''
                        }

                    </div>  
                } 
            </div>
        </>
    );
}