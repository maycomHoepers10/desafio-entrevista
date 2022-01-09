import { ClientTable }  from "../../components/ClientTable";

export function ClientList() {

    return (
        <div className="page-content" id="new-client-content">
            <h1>Lista de clientes</h1>
            <br/>
            <ClientTable />
        </div>
    );
}