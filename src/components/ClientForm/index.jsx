import 'date-fns';
import "./styles.scss";
import TextField from '@material-ui/core/TextField';
import { VIEW_MODE } from '../../constants/PageMode';
import {
    PhoneMask,
    CPFMask,
    CepMask,
    MoneyMask
} from "../Input/Mask";
import { withStyles } from '@material-ui/core/styles';

  const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#FFF',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#ed64a6',
      },
      '& .MuiOutlinedInput-input': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#FFF',
        },
        '&:hover fieldset': {
          borderColor: '#ed64a6',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ed64a6',
        },
      },
    },
  })(TextField);


function FormRow({ children }) {

    return (
        <div className="form-row">
            {children}
        </div>
    );
}

export function FirstStepForm(clientForm) {

    const {
        name, setName,
        lastName, setLastName,
        email, setEmail,
        phone, handleChangePhone,
        firstStepFormError:{
            nameError,
            lastNameError,
            emailError,
            phoneError
        },
        mode
    } = clientForm;

    const isViewMode = VIEW_MODE === mode;

    return (
        <div id="first-step-form" className="form-content">
            <FormRow>
                <>
                    <CustomTextField
                        id="name" 
                        required={!isViewMode}
                        value={name}
                        onChange={event => setName(event.target.value)}
                        color="secondary"
                        label="Nome" 
                        variant="outlined"
                        style={{width: "calc(50% - 5px)"}}
                        error={nameError}
                        helperText={nameError ? "Preenchimento obrigatório." : ""}
                        inputProps={
                            { readOnly: isViewMode}
                        }
                    />
                    <CustomTextField
                        id="lastName" 
                        required={!isViewMode}
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        color="secondary"
                        label="Sobrenome" 
                        variant="outlined"
                        style={{width: "calc(50% - 5px)"}}
                        error={lastNameError}
                        helperText={lastNameError ? "Preenchimento obrigatório." : ""}
                        inputProps={
                            { readOnly: isViewMode}
                        }
                    />
                </>
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="email" 
                    required={!isViewMode}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    color="secondary"
                    label="E-mail" 
                    variant="outlined"
                    fullWidth
                    error={emailError}
                    helperText={emailError ? "Preenchimento obrigatório." : ""}
                    inputProps={
                        { readOnly: isViewMode}
                    }
                />
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="phone" 
                    required={!isViewMode}
                    value={phone.textmask}
                    onChange={event => handleChangePhone(event.target.value)}
                    color="secondary"
                    label="Telefone" 
                    variant="outlined"
                    InputProps={{
                        inputComponent: PhoneMask
                    }}
                    error={phoneError}
                    helperText={phoneError ? "Preenchimento obrigatório." : ""}
                    inputProps={
                        { readOnly: isViewMode}
                    }
                />
            </FormRow>
        </div>
    );
}

export function SecondStepForm(clientForm) {
 
    const {
        cep, setCep,
        firstAddress, setFirstAddress,
        secondAddress, setSecondAddress,
        secondStepFormError: {
            cepError,
            firstAddressError
        },
        mode
    } = clientForm

    const isViewMode = VIEW_MODE === mode;

    return (
        <div id="second-step-form" className="form-content">
            <FormRow>
                <CustomTextField
                    id="cep" 
                    required={!isViewMode}
                    value={cep}
                    onChange={event => setCep(event.target.value)}
                    color="secondary"
                    label="CEP" 
                    variant="outlined"
                    InputProps={{
                        inputComponent: CepMask
                    }}
                    error={cepError}
                    helperText={cepError ? "Preenchimento obrigatório." : ""}
                    inputProps={
                        { readOnly: isViewMode}
                    }
                />
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="firstAddress"
                    required={!isViewMode}
                    value={firstAddress}
                    onChange={event => setFirstAddress(event.target.value)}
                    color="secondary"
                    label="Endereço 1" 
                    variant="outlined"
                    fullWidth
                    error={firstAddressError}
                    helperText={firstAddressError ? "Preenchimento obrigatório." : ""}
                    inputProps={
                        { readOnly: isViewMode}
                    }
                />
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="secondAddress"
                    value={secondAddress}
                    onChange={event => setSecondAddress(event.target.value)}
                    color="secondary"
                    label="Endereço 2" 
                    variant="outlined"
                    fullWidth
                    inputProps={
                        { readOnly: isViewMode}
                    }
                />
            </FormRow>
        </div>
    );
}

export function ThirdStepForm(clientForm) {

    const {
        birthDate, setBirthDate,
        cpf, setCpf,
        income, setIncome,
        thirdStepFormError: {
            birthDateError,
            cpfError,
            incomeError
        },
        mode
    } = clientForm

    const isViewMode = VIEW_MODE === mode;

    return (
        <div id="second-step-form" className="form-content">
            <FormRow>
                <CustomTextField
                    id="birthDate"
                    required={!isViewMode}
                    label="Data de Nascimento"
                    type="date"
                    value={birthDate.toString().split('T')[0]}
                    onChange={event => setBirthDate(event.target.value)}
                    defaultValue={null}
                    variant="outlined"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={
                        { readOnly: isViewMode}
                    }
                    error={birthDateError}
                    helperText={birthDateError ? "Preenchimento obrigatório." : ""}
                />
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="cpf" 
                    required={!isViewMode}
                    value={cpf}
                    onChange={event => setCpf(event.target.value)}
                    color="secondary"
                    label="CPF" 
                    variant="outlined"
                    InputProps={{
                        inputComponent: CPFMask,
                        readOnly: isViewMode
                    }}
                    error={cpfError}
                    helperText={cpfError ? "Preenchimento obrigatório." : ""}
                />
            </FormRow>
            <FormRow>
                <CustomTextField
                    id="income" 
                    required={!isViewMode}
                    value={income}
                    onChange={event => setIncome(event.target.value)}
                    color="secondary"
                    label="Renda Mensal" 
                    variant="outlined"
                    InputProps={{
                        inputComponent: MoneyMask,
                        readOnly: isViewMode
                    }}
                    error={incomeError}
                    helperText={incomeError ? "Preenchimento obrigatório." : ""}
                />
            </FormRow>
        </div>
    );
}

export function CompletedForm() {

	return (
		<div className="form-content success-message">
			<h1>Cadastro concluído com sucesso!</h1>
		</div>
	);
}
