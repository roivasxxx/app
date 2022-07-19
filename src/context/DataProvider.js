import React,{useContext,useReducer} from "react"
import { Reducer } from "./Reducer"

const Context = React.createContext()

export const useData=()=>{
    return useContext(Context);
}


export default function ContextProvider(props){
    const initialState={tasks:[],notes:[]};

    const [state,dispatch]=useReducer(Reducer,initialState);

    const disp=(dispProps)=>{
        dispatch(dispProps)
    }

    return (<Context.Provider value={{tasks:state.tasks,notes:state.notes,dispatch:disp}}>
        {props.children}
    </Context.Provider>)
}
