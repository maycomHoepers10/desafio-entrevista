import './styles/global.scss';

import { useState } from 'react';
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Welcome } from "./pages/Welcome";
import { NewClient } from "./pages/NewClient";
import { ClientList } from "./pages/ClientList";
import { ViewClient } from "./pages/ViewClient";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export function App() {
    const [openSidebar, setOpenSidebar ] = useState(true);

    const handleOpenSidebar = () => {
        setOpenSidebar(true);
    };

    const handleCloseSidebar = () => {
        setOpenSidebar(false);
    };

    return (
        <>
        <Header handleOpenSidebar={handleOpenSidebar} />
        <Router>
        <div id="app-container">
            <Sidebar handleCloseSidebar={handleCloseSidebar} openSidebar={openSidebar} />
            <Switch>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route path="/novoCliente">
                    <NewClient />
                </Route>
                <Route path="/cliente/:id">
                    <ViewClient />
                </Route>
                <Route path="/clientes">
                    <ClientList />
                </Route>
            </Switch>
        </div>
      </Router>
      </>
    );
}