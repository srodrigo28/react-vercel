import axios from "axios";
import './style.css'
import { useState, useEffect } from "react";

export function Users() {
    const [ data, setData] = useState([]);

    const [ id, setId ]   = useState("")
    const [ nome, setNome ]   = useState("")
    const [ email, setEmail ] = useState("")
    const [ senha, setSenha ] = useState("")

    const [ classBtnInserir, setClassBtnInserir] = useState('');
    const [ classBtnAlterar, setClassBtnAlterar] = useState('sumir');

    /** Metodo Carregar dados  */
    useEffect( () => {
        axios.get('http://localhost:3001/users')
          .then(response => setData(response.data));
    }, [data]);

    /** Metodo Inser  */
    const Inserir = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3001/users", {
            nome,
            email,
            senha
        })

        .then( () => {
                alert(nome + " Cadastrado com sucesso")
                setNome(''), setEmail(''), setSenha('')
            }
        )

        .catch( (error) => {
            console.log('erro: ' + error)
        })
    
    }

    /** Metodo Remover  */
    const Remover =(id, nome) => {
        const res = window.confirm('Deseja realmente excluir? ' + nome)
        if(res === true){
            axios.delete(`http://localhost:3001/users/${id}`)
            return false
        }
    }

    /** Metodo Carregar campos para editar  */
    const CarregaCampos = (nome, email, senha, id) => {
            setClassBtnInserir('sumir')
            setClassBtnAlterar('')

        setNome(nome), setEmail(email), setSenha(senha), setId(id)
    }

    /** Metodo Alterar  */
    function Alterar(e){
        e.preventDefault()

        axios.put(`http://localhost:3001/users/${id}`, {
            nome,
            email,
            senha
        })
        .then( () => {
                alert(nome + " Atualizado com sucesso");
                
                setNome(''), setEmail(''), setSenha(''), setId('');

                setClassBtnInserir('')
                setClassBtnAlterar('sumir')
            }
        )
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    /** View */
    return(
        <div className="container">
            <h1 className="mt-5 mb-5">Controle de Usuários</h1>
            <form className="mb-5">
                <div className="row mb-2">
                        <div className="col">
                            <label>Nome</label>
                            <input type="text" className="form-control" value={nome} onChange={ e => setNome(e.target.value)} />
                        </div>
                        <div className="col">
                            <label>E-mail</label>
                            <input type="text" className="form-control" value={email} onChange={ e => setEmail(e.target.value)} />
                        </div>
                        <div className="col">
                            <label>Senha</label>
                            <input type="password" className="form-control" value={senha} onChange={ e => setSenha(e.target.value)} />
                        </div>
                </div>
                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />

                    <button className={`btn btn-outline-primary ${classBtnInserir}`} onClick={Inserir}>Salvar</button>
                    <button className={`btn btn-outline-warning ${classBtnAlterar}`} onClick={Alterar}>Editar</button>
            </form>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="fild-50">ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Senha</th>
                        <th className="fild-100">Ações</th>
                    </tr>
                </thead>
            
                <tbody>
                    { data.map((item) => (
                        <tr key={item.id}>
                            <td className="fild-50">{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.email}</td>
                            <td>{item.senha}</td>
                            <td className="fild-btn">
                                <button onClick={ () => CarregaCampos(item.nome, item.email, item.senha, item.id) } className="btn btn-outline-warning">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button onClick={ () => Remover(item.id, item.nome) }  className="btn btn-outline-danger">
                                    <i className="fa-regular fa-trash-can">
                                </i></button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}