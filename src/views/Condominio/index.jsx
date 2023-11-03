import { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

export function Condominio() {
    const url = "https://macatto-api2.vercel.app/condominio"
    const [ id, setId ]   = useState("")
    const [ classBtnInserir, setClassBtnInserir] = useState('');
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir');
    
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(url)
          .then(response => setData(response.data));
    }, [data]);

    //Variaveis
    const [ nome, setNome ] = useState("")
    const [ cnpj, setCnpj ] = useState("")
    const [ estadual, setEstadual ] = useState("")
    const [ contato, setContato ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ cidade, setCidade ] = useState("")
    const [ endereco, setEndereco ] = useState("")

    const Inserir = (event) => {
        event.preventDefault();

       console.log(nome, cnpj, estadual, contato, email, cidade, endereco);

        /***     */ 
            axios.post(url, {
                nome,
                cnpj,
                estadual,
                contato,
                email,
                cidade,
                endereco
            })
    
            .then( () =>
                alert("Cadastrado com sucesso")
            )
    
            .catch( (error) => {
                console.log('erro: ' + error)
            })
       
    }

    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            console.log(url + "/" + id);
            axios.delete(url + "/" + id)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = (nome, cnpj, estadual, contato, email, cidade, endereco, id) => {
        setClassBtnInserir('sumir')
        setClassBtnAlterar('')

        console.log(nome, cnpj, estadual, contato, email, cidade, endereco, id)

        setNome(nome), setCnpj(cnpj), setEstadual(estadual), 
        setContato(contato), setEmail(email), setCidade(cidade), setEndereco(endereco), setId(id);
    }

     /** Metodo Alterar  */
     function Alterar(e){
        e.preventDefault()

        axios.put(url+`/${id}`, {
            nome, cnpj, estadual, contato, email, cidade, endereco
        })
        .then( () => {
                alert(nome + " Atualizado com sucesso");
                
                setNome(nome), setCnpj(cnpj), setEstadual(estadual), 
                setContato(contato), setEmail(email), setCidade(cidade), setEndereco(endereco), setId(id);

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    return(
        <div className="container">
            <h1 className="text-center mt-3 mb-3">Controle Condominio</h1>
            
            <form className="mb-4">
                <div className="row">
                    <div className="col">
                        <label>Condomínio</label>
                        <input type="text" className="form-control" onChange={ e => setNome(e.target.value)} value={nome}/>
                    </div>
                    <div className="col">
                        <label>CNPJ</label>
                        <input type="text" className="form-control" onChange={ e => setCnpj(e.target.value)} value={cnpj}/>
                    </div>
                    <div className="col">
                        <label>Insc Estadual</label>
                        <input type="text" className="form-control" onChange={ e => setEstadual(e.target.value)} value={estadual}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Contato</label>
                        <input type="text" className="form-control" onChange={ e => setContato(e.target.value)} value={contato}/>
                    </div>
                    <div className="col">
                        <label>E-mail</label>
                        <input type="text" className="form-control" onChange={ e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="col">
                        <label>Cidade</label>
                        <input type="text" className="form-control" onChange={ e => setCidade(e.target.value)} value={cidade}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />
                    <div className="col">
                        <label>Endereço</label>
                        <input type="text" className="form-control" onChange={ e => setEndereco(e.target.value)} value={endereco}/>
                    </div>
                </div>

                <button className={`btn btn-outline-primary ${classBtnInserir}`} onClick={Inserir}>Salvar</button>
                <button className={`btn btn-outline-warning ${classBtnAlterar}`} onClick={Alterar}>Editar</button>
            </form>

            <h1 className="text-center">Lista</h1>

            <div className="table-responsive-sm">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Condominio</th>
                        <th>CNPJ</th>
                        <th>Insc. Estadual</th>
                        <th>Contato</th>
                        <th>E-mail</th>
                        <th>Cidade</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
            
                <tbody>
                    { data.map((item) => (
                        <tr  key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.cnpj}</td>
                            <td>{item.estadual}</td>
                            <td>{item.contato}</td>
                            <td>{item.email}</td>
                            <td>{item.cidade}</td>
                            <td>{item.endereco}</td>
                            <td>
                                <button onClick={ () => CarregaCampos(item.nome, item.cnpj, item.estadual, item.contato, item.email, item.cidade, item.endereco, item.id)} className="btn btn-outline-warning">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button onClick={ () => Remover(item.id, item.nome) }  className="btn btn-outline-danger">
                                    <i className="fa-solid fa-trash-can-arrow-up"></i>
                                </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            </div>
        </div>
    )
}