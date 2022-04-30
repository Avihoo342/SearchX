import React, {FunctionComponent, useState} from "react";
import {Box, TextField} from "@mui/material";
import useStyles from "./GSearch.style";
import {suggestions} from '../../DB/suggestions'
import {suggestionModel} from "../../api/models/suggestionModel";

const GSearch: FunctionComponent = () => {
    const classes = useStyles();
    const [activeSuggestions, SetActiveSuggestions] = useState(0);
    const [filteredSuggestions, SetFilteredSuggestions] = useState<suggestionModel[]>([]);
    const [showSuggestions, SetShowSuggestions] = useState(false);
    const [userInput, SetUserInput] = useState(false);

    const handleChange = (e: any) => {
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            (suggestion: any) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        SetActiveSuggestions(activeSuggestions)
        SetFilteredSuggestions(filteredSuggestions)
        SetShowSuggestions(true)
        SetUserInput(e.currentTarget.value)
    }
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"} alignItems={"center"}
             marginTop={"20%"}>
            <Box mb={3}>
                <img src={"https://www.google.co.il/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"}
                     alt={"Google"}/>
            </Box>
            <Box className={classes.GoogleSearchInput}>
                <TextField
                    className={classes.GoogleSearchInput}
                    onChange={handleChange}
                    id="search"
                    fullWidth
                    label={"Search"}
                    size="small"
                />
            </Box>
        </Box>
    );
};

export default GSearch;
