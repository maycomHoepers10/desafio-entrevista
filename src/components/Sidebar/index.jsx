
import "./styles.scss";
import {
    NavLink
} from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/drawer';

function NavSection({ handleCloseSidebar, openSidebar }) {

    const matches = useMediaQuery('(min-width:790px)');
    const activeLink = (isActive) => {
        return ({fontWeight: isActive ? "bold" : "normal", color: isActive ?"#eb318a" : "#ed64a6"});
    };

    let navSection = (
        <section className="nav-section">
            <p>GERAL</p>
            <nav>
                <NavLink to="/novoCliente" style={activeLink}>Novo Cliente</NavLink>
                <NavLink to="/clientes" style={activeLink}>Lista de Clientes</NavLink>
            </nav>
        </section>
    );

    if (matches) {
        return (
            <div id="sidebar-content">
                {navSection}
            </div>
        );
    }

    return (
        <Drawer open={openSidebar} onClose={handleCloseSidebar}>
            <div id="sidebar-drawer">
                {navSection}
            </div>
        </Drawer>
    );
}

export function Sidebar(props) {
   
    return (
        <NavSection {...props} />
    );
}