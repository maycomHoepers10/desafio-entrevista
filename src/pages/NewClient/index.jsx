import { ClientStepper } from "../../components/ClientStepper";
import { ClientFormProvider } from '../../hooks/useClientFormContext';
import "../../styles/global.scss";

export function NewClient() {

    return (
        <div className="page-content" >
            <h1>Novo Cliente</h1>
            <br/>
            <ClientFormProvider>
                <ClientStepper />
            </ClientFormProvider>
        </div>
    );
}