import React from "react";
import {Box, Typography} from "@mui/material";
import useStyles from "../../containers/Search/GSearch.style";
import {Link} from "@material-ui/core";


const DisplayResults= ({results, timeCalc}) => {
    const classes = useStyles();
    return (
        <Box>
            <Box>{`time to calculate : ${timeCalc}`}</Box>
            <ul>
                {results.map((option,e) => {
                    return (
                        <li
                            key={e}
                            value={option.title}
                        >
                            <Link href={option.url}>{option.title}</Link>
                            <Typography variant="body2" gutterBottom>{option.Description}</Typography>

                        </li>
                    );
                })}
            </ul>
        </Box>
    );
}

export default DisplayResults;
