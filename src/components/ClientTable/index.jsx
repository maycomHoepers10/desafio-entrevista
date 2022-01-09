import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './styles.scss';

const columns = [
	{ id: 'id', label: '#ID', minWidth: 10 },
  	{ id: 'name', label: 'Nome completo', minWidth: 170 },
  	{ id: 'cpf', label: 'CPF', minWidth: 100 },
  	{ id: 'phone', label: 'Telefone', minWidth: 100 },
  	{ id: 'email', label: 'E-mail', minWidth: 170 },
];

function createData(id, name, cpf, phone, email) {
  return {id, name, cpf, phone, email};
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		background: 'transparent',
	},
	container: {
		height: 'auto',
		background: 'transparent',
		overflowY: 'hidden'
	},
});

const useTableCellStyle = makeStyles({
	root: {
		color: 'white'
	},
	head: {
		color: '#ed64a6',
		backgroundColor: '#1f2029'
	}
});

export function ClientTable() {
	const classes = useStyles();
	const tableCellStyle = useTableCellStyle();
	const [rows, setRows] = useState([]);
	
	useEffect(() => {
		let lsClientList = JSON.parse(window.localStorage.getItem('LsClientList')) ?? [];

		let records = lsClientList.map((element, index) => 
			createData(
				index,
				element.name+" "+element.lastName,
				element.cpf,
				element.phone.textmask,
				element.email
			)
		);

		setRows(records)
	}, []);

	const showClientData = (id) => {
		window.location = window.location.origin + '/cliente/' + id;
	};

  	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						className={tableCellStyle.head}
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						>
						{column.label}
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
					return (
						<TableRow onClick={() => showClientData(row.id)}  hover role="checkbox" tabIndex={-1} key={row.code}>
						{columns.map((column) => {
							const value = row[column.id];
							return (
							<TableCell className={tableCellStyle.root} key={column.id} align={column.align}>
								{value}
							</TableCell>
							);
						})}
						</TableRow>
					);
					})}
				</TableBody>
				</Table>
			</TableContainer>
		</Paper>
  	);
}
