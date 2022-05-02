import React, {FunctionComponent} from "react";
import {Box} from "@mui/material";
import {suggestionModel} from "../../api/models/suggestionModel";
import useStyles from "../../containers/Search/GSearch.style";

interface Props {
    options:suggestionModel[]
    funcApply: (e:any) => void
    invisibility: boolean
    historyList:suggestionModel[]
}

const DisplaySuggestions: FunctionComponent<Props> = ({options,funcApply, invisibility, historyList}:Props) => {
    const classes = useStyles();
    const IsInHistoryList = (historyList:suggestionModel[], option:string) =>{
        const res = historyList.filter((item) => item.title === option)
        if(res.length > 0)
            return true
        return false
    }
    return (
        <Box className={invisibility? classes.hide: classes.allResultsDesign}  key={"InputKey"}>
                <ul  key={"InputKey"}>
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
                                <span>{option.title}</span>
                            </li>
                        );
                    })}
                </ul>
        </Box>
    );
}

export default DisplaySuggestions;
