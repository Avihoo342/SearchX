import React, {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {suggestionModel} from "../../api/models/suggestionModel";
import useStyles from "../../containers/Search/GSearch.style";
import SearchIcon from "../../assets/search_icon.png"

interface Props {
    options:suggestionModel[]
    funcApply: (e:any) => void
    invisibility: boolean
    historyList:suggestionModel[]
}

const DisplaySuggestions: FunctionComponent<Props> = ({options,funcApply, invisibility, historyList}:Props) => {
    const classes = useStyles();
    console.log(historyList)
    const IsInHistoryList = (historyList:any[], option:string) =>{
        const res = historyList.filter((item) => item === option)
        console.log(res.length)
        if(res.length > 0)
            return true
        return false
    }
    return (
        <Box className={invisibility? classes.hide: classes.allResultsDesign}>
                <ul>
                    {options.map((option:any,e:any) => {
                        return (

                            <li
                                key={e}
                                className={IsInHistoryList(historyList, option.title)?classes.InList:classes.NotInList}
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
