import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
	FirstStepForm,
	SecondStepForm,
	ThirdStepForm,
	CompletedForm
} from "../ClientForm";
import { useClientForm } from '../../hooks/useClientFormContext';
import { VIEW_MODE } from '../../constants/PageMode';

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%'
  },
  backButton: {
	marginRight: theme.spacing(1),
  },
  instructions: {
	marginTop: theme.spacing(1),
	marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Dados principais', 'Endereço', 'Documentos'];
}

function getStepContent(
	activeStep, 
	clientForm
) {

	switch (activeStep) {
		case 0:
			return FirstStepForm(clientForm);
		case 1:
			return SecondStepForm(clientForm);
		case 2:
			return ThirdStepForm(clientForm);
		case 3: 
			return CompletedForm();
		default:
			return 'Step not found!';
	}
}

export function ClientStepper() {
	const clientForm = useClientForm();
	const isViewMode = clientForm.mode === VIEW_MODE;
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = () => {

		if (
			clientForm.validateFirstStepForm(activeStep === 0 && !isViewMode) &&
			clientForm.validateSecondStepForm(activeStep === 1 && !isViewMode) &&
			clientForm.validateThirdStepForm(activeStep === 2 && !isViewMode)
		) {
			if (activeStep === steps.length - 1) {

				if (isViewMode) {
					window.location = window.location.origin + '/clientes';
				} else {
					clientForm.saveData();
				}
			}
			
			if (activeStep === steps.length - 1 && isViewMode) {
				return false;
			}

			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

  	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} style={{backgroundColor: "#1f2029"}}>
				{steps.map((label) => (
				<Step key={label} >
					<StepLabel><p style={{color: "white"}}>{label}</p></StepLabel>
				</Step>
				))}
			</Stepper>
			<div>
					<Typography color="primary" className={classes.instructions}>
					{getStepContent(
						activeStep,
						clientForm
					)}
					</Typography>
					<div style={{margin: "20px 2rem"}}>
					{(activeStep !== 0 && activeStep !== 3) &&
						<Button
							style={{color: "white"}}
							disabled={activeStep === 0}
							onClick={handleBack}
							className={classes.backButton}
						>
							Voltar
						</Button>
					}
					{activeStep !== 3 && <Button variant="contained" color={activeStep === steps.length - 1 && isViewMode ? "secondary" : "primary"} onClick={handleNext}>
						{activeStep === steps.length - 1 ? (isViewMode ? 'Sair': 'Salvar') : 'Próximo'}
					</Button>}
					</div>
			</div>
		</div>
	);
}
