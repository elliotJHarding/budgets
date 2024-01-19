import './App.css';
import React, {useEffect, useState} from "react";
import Login from './components/Auth/Login/Login'
import Signup from "./components/Auth/Signup/Signup";
import {AuthContext, Auth} from './components/Auth/AuthContext'
import ReactCSSTransitionGroup from 'react-transition-group'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import User from "./components/Auth/User/User";
import Root from "./Root";
import Transactions from "./components/Transactions/Transactions";
import Reports from "./components/Reports/Reports";
import BankSelect from "./components/OpenBanking/BankSelect";
import TagEditor from "./components/Tag/TagEditor";
import Budgets from "./components/Budgets/Budgets";
import Holidays from "./components/Holidays/Holidays";

export default App;

function App() {

    const router = createBrowserRouter([
        { path: "/", element: <Root/>, children: [
            { path: "/login", element: <Login/> },
            { path: "/signup", element: <Signup/> },
            { path: "/user", element: <User/>},
                {path: "/transactions", element: <Transactions/>},
                {path: "/reports", element: <Reports/>},
                {path: "/bankselect", element: <BankSelect/>},
                {path: "/tags", element: <TagEditor/>},
                {path: "/budgets", element: <Budgets/>},
                {path: "/holidays", element: <Holidays/>}
        ]}
    ])

    const [authContext, setAuthContext] = useState(new Auth(null));

    return (
        <div className="App">
            <AuthContext.Provider value={{authContext, setAuthContext}}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        </div>
    );
}
