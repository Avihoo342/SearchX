import React from "react";
import {Box} from "@mui/material";
import useStyles from "../../containers/Search/GSearch.style";
import SearchIcon from "../../assets/search_icon.png"

const DisplaySuggestions = ({options, funcApply, invisibility, historyList}) => {
    const classes = useStyles();
    const IsInHistoryList = (historyList, option) => {
        const res = historyList.filter((item) => item === option)
        return res.length > 0
    }
    return (
        <Box className={invisibility ? classes.hide : classes.allResultsDesign}>
            <ul>
                {options.map((option, e) => {
                    return (

                        <li
                            key={e}
                            className={IsInHistoryList(historyList, option.title) ? classes.InList : classes.NotInList}
                            value={option.title}
                            onMouseDown={() => {
                                funcApply(option)
                            }}
                        >
                            <img src={SearchIcon} alt={"search"} width={"20px"} height={"20px"}/>
                            <span>{" "}{option.title}</span>
                        </li>
                    );
                })}
            </ul>
        </Box>
    );
}

export default DisplaySuggestions;
