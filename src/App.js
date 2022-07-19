import './App.css'
import './index.css'
import { useState, useEffect } from 'react'
import { HashRouter, Outlet } from 'react-router-dom'
import Router from './routing/Router'
import MainWindow from './components/windows/MainWindow'
import ContextProvider from './context/DataProvider'

function App() {
    useEffect(() => {
        // window.electron.sendBack("returnData", (data) => setText(data));
    }, [])

    return (
        <HashRouter>
            <ContextProvider>
                <MainWindow />
            </ContextProvider>
        </HashRouter>
    )
}

export default App
