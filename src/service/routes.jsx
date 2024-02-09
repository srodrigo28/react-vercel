import { createBrowserRouter } from "react-router-dom";

import { Users } from './../views/Users'
import { Register } from './../views/Investidor'
import { Investidor } from './../views/Investidor'
import { Condominio } from './../views/Condominio'
import { Contas } from './../views/Contas'
import { Login } from './../views/Login'

const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/users", element: <Users /> },
    { path: "/contas", element: <Contas /> },
    { path: "/invest", element: <Investidor /> },
    { path: "/register", element: <Register /> },
    { path: "/condominio", element: <Condominio /> }
    
]);

