import React from "react";
import {Box, Typography} from "@mui/material";
import {Link} from "@material-ui/core";


const DisplayResults= ({results, timeCalc}) => {
    //const classes = useStyles(); - later work can do styling here
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
