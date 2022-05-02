import React, {FunctionComponent} from "react";
import {Box, Typography} from "@mui/material";
import {suggestionModel} from "../../api/models/suggestionModel";
import useStyles from "../../containers/Search/GSearch.style";
import {Link} from "@material-ui/core";

interface Props {
    results:suggestionModel[]
    timeCalc:number
}

const DisplayResults: FunctionComponent<Props> = ({results, timeCalc}:Props) => {
    const classes = useStyles();
    return (
        <Box key={"InputKey"}>
            <Box>{timeCalc}</Box>
            <ul  key={"InputKey"}>
                {results.map((option:suggestionModel,e:any) => {
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
