import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Box, TextField} from "@mui/material";
import useStyles from "./GSearch.style";
import {suggestions} from '../../DB/suggestions'
import {suggestionModel} from "../../api/models/suggestionModel";
import SearchIcon from "../../assets/search_icon.png"
import ReactDOM from "react-dom";

const GSearch: FunctionComponent = () => {
    const classes = useStyles();
    const [activeSuggestion, SetActiveSuggestion] = useState(0);
    const [filteredSuggestions, SetFilteredSuggestions] = useState<suggestionModel[]>([]);
    const [showSuggestions, SetShowSuggestions] = useState(false);
    const [userInput, SetUserInput] = useState("");
    const [suggestionsListComponent, SetsuggestionsListComponent] = useState<any>([]);
    const inputRef = useRef<any>();

    const handleChange = (e: any) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            (suggestion: suggestionModel) =>
                suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        SetActiveSuggestion(activeSuggestion)
        SetFilteredSuggestions(filteredSuggestions)
        SetShowSuggestions(true)
        SetUserInput(e.currentTarget.value)
    }
    const onClick = (e: any) => {
        SetActiveSuggestion(0)
        SetFilteredSuggestions([])
        SetShowSuggestions(false)
        SetUserInput(e.currentTarget.innerText)
    };

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            SetActiveSuggestion(0)
            SetShowSuggestions(false)
            SetUserInput(filteredSuggestions[activeSuggestion].label)
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            SetActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            SetActiveSuggestion(activeSuggestion + 1);
        }
    };

    const render = () => {
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                SetsuggestionsListComponent(filteredSuggestions);
            } else {

            }
        }
        SetsuggestionsListComponent(suggestionsListComponent)
    }

    const handleMouseOut = (current:any) =>{
        if (document.activeElement !== ReactDOM.findDOMNode(current)) {
            //save in memory exist list and hide the existing list
            console.log("fdsfdsfsdf")
            SetFilteredSuggestions([]);
        }
    }
    useEffect(()=>{
        if(inputRef.current) inputRef.current?.focus();
    },[])

    useEffect(() => {
        render()
    }, [userInput])

    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"} alignItems={"center"}
             marginTop={"20%"}>
            <Box mb={3}>
                <img src={process.env.REACT_APP_GOOGLE_IMAGE}
                     alt={"Google"}/>
            </Box>
            <Box className={classes.GoogleSearchInput}>
                <Box>
                    <TextField
                        className={classes.GoogleSearchInput}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        inputProps={{ref:inputRef,
                            onBlur: () => handleMouseOut(inputRef.current)
                        }}
                        value={userInput}
                        id="search"
                        fullWidth
                        autoComplete='off'
                        label={"Search"}
                        size="small"
                    >
                    </TextField>
                    <img src={SearchIcon} alt={"search"} width={"20px"} height={"20px"}/>
                </Box>
                {filteredSuggestions.length > 0 &&
                    <Box className={classes.allResultsDesign}>
                        <ul>
                            {filteredSuggestions.slice(0, Number(process.env.REACT_APP_MAX_ELEMENT_DISPLAY)).map((item, key) => {
                                return (<li className={key === activeSuggestion? classes.active: classes.notActive} key={key} onClick={onClick}>
                                    {item.label}
                                </li>)
                            })}
                        </ul>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default GSearch;
