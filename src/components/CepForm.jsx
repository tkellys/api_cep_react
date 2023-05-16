import axios from "axios";
import { useEffect, useState } from "react";



export const CepForm = () => {

    //useState é para inicializar o useEffect começa vazio e vai alimentando pelos options do MAP //setEstados sera a nova variavel preenchida por isso sera chamada la em baixo
    const [estados, setEstados] = useState([]);

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
        
//Aqui vamos carregar os dados atraves do cep para completar os campos automaticos
// evento é pra comunicar com o onBlur la embaixo
            const BuscarEnderecoPorCep = (evento) => { 
                
                let cep = evento.target.value;
              
                axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(function (response){
                    
                    console.log(response.data)
                })
              
              
    //useEfect que vai chamar nosso get api
    useEffect(() => {
        buscarEstados()
    }, []) // colchete vazio para nao ter loop infinito

    return (
        <div className="container">
            <h1>Buscar Endereço com CEP</h1>
            <hr />

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputCep"
                        className="form-label">
                        Cep</label>
                    <input type="cep"
                        onBlur={BuscarEnderecoPorCep} // toda chamada on precisa de um evento.target pra recuperar o valor aqui
                        className="form-control"
                        id="cepId">
                    </input>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEndereço4"
                        className="form-label">
                        Endereço</label>
                    <input type="Endereço"
                        className="form-control"
                        id="inputEndereço4">
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
                        id="inputBairro">
                    </input>
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputEstado"
                        className="form-label">
                        Estado</label>
                    <select id="inputEstado"
                        className="form-select">
                        <option selected>Selecione...</option>
                        {estados}
                    </select>
                </div>


                <div className="col-md-6">
                    <label htmlFor="inputCidade"
                        className="form-label">
                        Cidade</label>
                    <select id="inputEstado"
                        className="form-select">
                        <option selected>Selecione...</option>
                        <option>...</option>
                    </select>
                </div>


                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </div>
    )
    }}