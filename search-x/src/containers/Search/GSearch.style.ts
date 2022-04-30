import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import colors from "../../theme/palette"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        GoogleSearchDisplay: {},
        GoogleSearchInput: {
            display: "flex",
            zIndex: 3,
            height: "44px",
            backgroundColor: colors.base.white,
            border: `solid 1px ${colors.base.gray}`,
            borderRadius: "24px",
            margin: "0 auto",
            width: "auto",
            maxWidth: "584px",
            fieldset: {
                border: "hidden",
            },
            "&.MuiTextField-root":{
                border: `solid 1px ${colors.base.gray}`,
                borderRadius: "24px",
                width: "584px",
            },
            "&.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                "&.css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                    borderStyle: "hidden",
                    backgroundColor: "black"
                }
            }

        },
        paper: {
            overflow: 'auto',
            position: "relative",
            width: '35%',
            height: "500px",
            backgroundColor: "white",
            border: "0px !important",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            maxHeight: '800px',
            overflowX: 'hidden',
            [theme.breakpoints.down('sm')]: {
                maxHeight: '100%',
                maxWidth: '500px'
            }
        },
    }),
);

export default useStyles
