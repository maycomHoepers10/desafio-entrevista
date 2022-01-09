import { 
    useState, 
    useEffect,
    useContext, 
    createContext 
} from 'react';

const ClientFormContext = createContext();

export function ClientFormProvider({ clientId, mode, children }) {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState({textmask: '48'});
    const [cep, setCep] = useState('');
    const [firstAddress, setFirstAddress] = useState('');
    const [secondAddress, setSecondAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cpf, setCpf] = useState('');
    const [income, setIncome] = useState(null);
    
    const handleChangePhone = (event) => {
		setPhone({
            textmask: event
		});
	};

    useEffect(() => {
        
        if (clientId) {
            let lsClientList = JSON.parse(window.localStorage.getItem('LsClientList')) ?? [];
            let data = lsClientList.filter((element, index) => index == clientId)[0];

            if (data) {
                setName(data.name);
                setLastName(data.lastName);
                setEmail(data.email);
                setPhone(data.phone);
                setCep(data.cep);
                setFirstAddress(data.firstAddress);
                setSecondAddress(data.secondAddress);
                setBirthDate(data.birthDate);
                setCpf(data.cpf);
                setIncome(data.income);
            }
        }

    }, [clientId, mode]); 

    const [firstStepFormError, setFirstStepFormError ] = useState({
        nameError: false,
        lastNameError: false,
        emailError: false,
        phoneError: false
    });

    const [secondStepFormError, setSecondStepFormError ] = useState({
        cepError: false,
        firstAddressError: false
    });

    const [thirdStepFormError, setThirdStepFormError ] = useState({
        birthDate: false,
        cpf: false,
        income: false
    });

    const validateFirstStepForm = (enabled) => {
        let isValid = true;

        if (enabled) {
            setFirstStepFormError({
                nameError: !name,
                lastNameError: !lastName,
                emailError: !email,
                phoneError: phone.textmask.length !== 14
            });

            if (!name || !lastName || !email || phone.textmask.length !== 14) {
                isValid = false;
            }
        }
        
        return isValid;
    };

    const validateSecondStepForm = (enabled) => {
        let isValid = true;

        if (enabled) {
            setSecondStepFormError({
                cepError: cep.length !== 10,
                firstAddressError: !firstAddress
            });

            if (cep.length !== 10 || !firstAddress) {
                isValid = false;
            }
        }

        return isValid;
    };

    const validateThirdStepForm = (enabled) => {
        let isValid = true;

        if (enabled) {
            setThirdStepFormError({
                birthDateError: birthDate.toString().length !== 10,
                cpfError: cpf.indexOf('_') !== -1 && cpf.length !== 14,
                incomeError: !income
            });

            if (birthDate.toString().length !== 10 || (cpf.indexOf('_') !== -1 && cpf.length !== 14) || !income) {
                isValid = false;
            }
        }

        return isValid;
    };

    const saveData = () => {
        let data = { 
            name,
            lastName, 
            email,
            phone,
            cep,
            firstAddress,
            secondAddress,
            birthDate,
            cpf, 
            income
        };

        let lsClientList = JSON.parse(window.localStorage.getItem('LsClientList')) ?? [];

        lsClientList.push(data);

        window.localStorage.setItem('LsClientList', JSON.stringify(lsClientList));
    };

    return (
        <ClientFormContext.Provider 
            value={{
                name, setName,
                lastName, setLastName,
                email, setEmail,
                phone, handleChangePhone,
                cep, setCep,
                firstAddress, setFirstAddress,
                secondAddress, setSecondAddress,
                birthDate, setBirthDate,
                cpf, setCpf,
                income, setIncome,
                validateFirstStepForm,
                validateSecondStepForm,
                validateThirdStepForm,
                firstStepFormError,
                secondStepFormError,
                thirdStepFormError,
                saveData,
                mode
            }}
        >
            {children}
        </ClientFormContext.Provider>
    )
}

export function useClientForm() {
    const context = useContext(ClientFormContext);

    return context;
}