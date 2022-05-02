import React, {useEffect, useRef, useState} from "react";
import {Box, TextField} from "@mui/material";
import useStyles from "./GSearch.style";
import {suggestions} from '../../DB/suggestions'
import SearchIcon from "../../assets/search_icon.png"
import XIcon from "../../assets/XIcon.jpg"
import DisplaySuggestions from "../../components/DisplaySuggestions/DisplaySuggestions";
import DisplayResults from "../../components/DisplayResults/DisplayResults";

const GSearch = () => {
    const classes = useStyles();
    const [activeSuggestion, SetActiveSuggestion] = useState(0);
    const [filteredSuggestions, SetFilteredSuggestions] = useState([]);
    const [showSuggestions, SetShowSuggestions] = useState(false);
    const [userInput, SetUserInput] = useState("");
    const [suggestionsListComponent, SetsuggestionsListComponent] = useState([]);
    const [invisibleResults, SetInvisibleResults] = useState(false);
    const [showResults, SetShowResults] = useState(false);
    const [Results, SetResults] = useState([]);
    const [historyList, SetHistoryList] =useState([]);
    const [timeCalc, SetTimeCalc] = useState(0)
    const inputRef = useRef();

    const getResultsBasedOnInput = (userInput) => {
        return suggestions.filter(
            (suggestion) =>
                suggestion.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ).slice(0,Number(process.env.REACT_APP_MAX_ELEMENT_DISPLAY));
    }
    const handleChange = (e) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = getResultsBasedOnInput(userInput);
        SetActiveSuggestion(activeSuggestion)
        SetFilteredSuggestions(filteredSuggestions)
        SetShowSuggestions(true)
        SetUserInput(e.currentTarget.value)
    }
    const onClickelement = (e) => {
        const list = historyList
        list.push(e.title)
        SetHistoryList(list)
        SetActiveSuggestion(0)
        SetFilteredSuggestions([])
        SetShowSuggestions(false)
        SetUserInput(e.title)
        let t0 = performance.now();
        SetResults(getResultsBasedOnInput(userInput));
        let t1 = performance.now();
        SetTimeCalc(t1-t0);
        SetShowResults(true)
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            SetActiveSuggestion(0)
            SetShowSuggestions(false)
            SetUserInput(filteredSuggestions[activeSuggestion].title)
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
                SetsuggestionsListComponent([]);
            }
        }
        SetsuggestionsListComponent(suggestionsListComponent)
    }

    const onFocus = () => {
        SetInvisibleResults(false);
    }

    const handleMouseOut = (current) => {
        SetInvisibleResults(true);
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current?.focus();
    }, [])

    useEffect(() => {
        render()
    })

    const clearHistory= () =>  {
        var newList=historyList.filter(function(itm){
            return itm!==userInput
        });
        SetUserInput("");
        SetHistoryList(newList)

    }

    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} width={"100%"} alignItems={"center"}
             marginTop={!showResults ? "20%" : "40px"}>
            <Box className={!showResults ? classes.AlignImageNotResults : classes.AlignImageResults}>
                <img src={process.env.REACT_APP_GOOGLE_IMAGE}
                     className={!showResults ? classes.ShowGoogleImage : classes.ShowSideGoogleImage}
                     alt={"Google"}/>
            </Box>
            <Box className={classes.GoogleSearchInput}>
                <Box>
                    <view>
                        <img src={SearchIcon} alt={"search"} className={classes.SearchICon}/>
                        {userInput.length > 0 &&
                            <img src={XIcon} alt={"search"} width={"20px"} height={"20px"} className={classes.xIcon}  onClick={clearHistory}/>}
                    <TextField
                        className={classes.GoogleSearchInput}
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        inputProps={{
                            ref: inputRef,
                            onBlur: () => handleMouseOut(inputRef.current),
                            onFocus: () => onFocus(),
                        }}
                        value={userInput}
                        id="search"
                        fullWidth
                        autoComplete='off'
                        size="small"
                        key={"InputKey"}
                    >
                    </TextField>
                    </view>
                </Box>
                {filteredSuggestions.length > 0 && showSuggestions &&
                    <DisplaySuggestions invisibility={invisibleResults} options={filteredSuggestions}
                                        funcApply={onClickelement} historyList={historyList}/>
                }
            </Box>
            <Box>
                {
                    showResults &&
                    <DisplayResults results={Results} timeCalc={timeCalc}/>
                }
            </Box>
        </Box>
    );
};

export default GSearch;
