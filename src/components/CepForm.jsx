import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";



export const CepForm = () => {
//------ FAZENDO API DOS ESTADOS -------------------------------
    //useState é para inicializar o useEffect começa vazio e vai alimentando pelos options do MAP //setEstados sera a nova variavel preenchida por isso sera chamada la em baixo
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState("");
    const [cidade, setCidade] = useState([]);
    const [cidadeSelecionado, setCidadeSelecionado] = useState("");
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");

    // a chamada da API é feita com uma const function dentro da function principal sempre.
    const buscarEstados = () => {

        //axios é p/ buscar API ao inves de fetch, nao esquecer de importar o axios la em cima
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then((response) => {

                // usaremos o MAP para fazer a lista aparecer nas options dos estados
                let arrayEstados = response.data.map((estado, index) => {
                    return (<option key={index} value={estado.sigla}> {estado.nome}</option>)
                })
                //agora chama 'estados' isso aqui na parte html do nosso form onde seria as options
                setEstados(arrayEstados)
            })
            .catch(function (error) {

                console.log(error);
            });
        };

        const buscarCidades = () => {

            //axios é p/ buscar API ao inves de fetch, nao esquecer de importar o axios la em cima
            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
                .then((response) => {
    
                    // usaremos o MAP para fazer a lista aparecer nas options dos estados
                    let arrayCidades = response.data.map((cidade, index) => {
                        return (<option key={index} value={cidade.nome}> {cidade.nome}</option>)
                    })
                    //agora chama 'cidades' isso aqui na parte html do nosso form onde seria as options
                    setCidade(arrayCidades)
                })
                .catch(function (error) {
    
                    console.log(error);
                });
            };
 //------------- FAZENDO API DO CEP -------------------------------       
//Aqui vamos carregar os dados atraves do cep para completar os campos automaticos
// evento é pra comunicar com o onBlur la embaixo
            const BuscarEnderecoPorCep = (evento) => { 
                let cep = evento.target.value;

        //validaçao do formulario com regras do Regex (tudo q nao for numero sera substituido por vazio)
                let cepvalidado = cep.replace(/[^0-9]/g, '');
                  if(cepvalidado.length !== 8){
                    return;}
                    
                axios.get(`https://viacep.com.br/ws/${cepvalidado}/json/`)
                .then((response) => {
                    console.log(response, response.data);
                    setEndereco(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setEstadoSelecionado(response.data.uf);
                    setCidadeSelecionado(response.data.localidade);
                });
            }
              
              
    //useEfect que vai chamar nosso get api
    useEffect(() => {
        buscarEstados();
        buscarCidades();
    }, []); // colchete vazio para nao ter loop infinito

    
//--------------- AQUI É O FORMULARIO DO ENDEREÇO ----------------------
    return (
        <div className="container">
            <h1>Buscar Endereço com CEP</h1>
            <hr />

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputCep"
                        className="form-label">
                        Cep</label>
                    <input type="text"
                        onBlur={(evento) => BuscarEnderecoPorCep(evento)} // toda chamada on precisa de um evento.target pra recuperar o valor aqui
                        className="form-control"
                        id="cepId"
                        >
                    </input>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEndereço4"
                        className="form-label">
                        Endereço</label>
                    <input type="text"
                        className="form-control"
                        id="endereco"
                        value={endereco}>
                    </input>
                </div>
                <div className="col-12">
                    <label htmlFor="inputComplemento"
                        className="form-label">
                        Complemento</label>
                    <input type="text"
                        className="form-control"
                        id="inputComplemento"
                        placeholder="Apartamento, estudio, loja">
                    </input>
                </div>
                <div className="col-12">
                    <label htmlFor="inputBairro"
                        className="form-label">
                        Bairro</label>
                    <input type="text"
                        className="form-control"
                        id="bairro"
                        value={bairro}>
                    </input>
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputEstado"
                        className="form-label">
                        Estado</label>
                    <select id="inputEstado"
                        className="form-select"
                       value={estadoSelecionado}>
                        <option selected>Selecione...</option>
                        {estados}
                    </select>
                </div>


                <div className="col-md-6">
                    <label htmlFor="inputCidade"
                        className="form-label">
                        Cidade</label>
                    <select id="cidade"
                        className="form-select"
                        value={cidadeSelecionado}>
                        <option selected>Selecione...</option>
                     {cidade}
                    </select>
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    )
    }