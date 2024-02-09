import { Link } from "react-router-dom"

export function Header(){
    return(
        <>
            <Link to="/">Login</Link>
            <Link to="/users">Users</Link>
            <Link to="/contas">Contas</Link>
            <Link to="/invest">Investidor</Link>
            <Link to="/register">Cadastro</Link>
            <Link to="/condominio">Condominio</Link>
        </>
    )
}