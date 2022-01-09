import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

export function PhoneMask(props) {
	const { inputRef, ...other } = props;
  
	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
			inputRef(ref ? ref.inputElement : null);
			}}
			mask={['(', /[1-9]/, /\d/,')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask
		/>
	);
}

export function CepMask(props) {
	const { inputRef, ...other } = props;
  
	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
			inputRef(ref ? ref.inputElement : null);
			}}
			mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
			placeholderChar={'0'}
			showMask
		/>
	);
}

export function CPFMask(props) {
	const { inputRef, ...other } = props;
  
	return (
		<MaskedInput
		{...other}
		ref={(ref) => {
			inputRef(ref ? ref.inputElement : null);
		}}
		mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/, /\d/]}

		showMask
		/>
	);
}

export function MoneyMask(props) {
  	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
				target: {
					name: props.name,
					value: values.value,
				},
				});
			}}
			thousandSeparator
			isNumericString
			prefix="R$"
		/>
	);
}