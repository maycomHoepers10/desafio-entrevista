import { useParams } from "react-router-dom";
import { ClientStepper } from "../../components/ClientStepper";
import { ClientFormProvider } from '../../hooks/useClientFormContext';
import "../../styles/global.scss";
import { VIEW_MODE } from '../../constants/PageMode';

export function ViewClient() {
    const { id } = useParams();

    return (
        <div className="page-content">
            <h1>Dados do Cliente</h1>
            <ClientFormProvider clientId={id} mode={VIEW_MODE}>
                <ClientStepper />
            </ClientFormProvider>
        </div>
    );
}