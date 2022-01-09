import "./styles.scss";
import { IconButton } from '@material-ui/core';
import { RiMenuLine } from 'react-icons/ri'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
	colorPrimary: {
		color: "white"
	},
});

export function Header({ handleOpenSidebar }) {
    const iconStyles = useStyles();
    const matches = useMediaQuery('(min-width:790px)');

    return (
        <header>
            {!matches && <IconButton onClick={handleOpenSidebar} className={iconStyles.colorPrimary}>
                <RiMenuLine />
            </IconButton>
            }
            <p id="logo">Desafio<span>.</span></p>
        </header>
    );
}