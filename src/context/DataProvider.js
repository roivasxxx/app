import React, { useContext, useEffect, useReducer } from 'react'
import { Reducer } from './Reducer'

const Context = React.createContext()

export const useData = () => {
    return useContext(Context)
}

export default function ContextProvider(props) {
    const initialState = { tasks: [], notes: [] }

    const [state, dispatch] = useReducer(Reducer, initialState)

    const disp = (dispProps) => {
        dispatch(dispProps)
    }

    useEffect(() => {
        window.electron.init()
        window.electron.sendBack('returnData', (sendback) =>
            disp({ type: sendback.action, data: sendback.data })
        )
    }, [])

    return (
        <Context.Provider
            value={{ tasks: state.tasks, notes: state.notes, dispatch: disp }}
        >
            {props.children}
        </Context.Provider>
    )
}
