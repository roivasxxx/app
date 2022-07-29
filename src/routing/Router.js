import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Todo from '../components/windows/Todo'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<NavBar />}>
                <Route exact path="/todo" element={<Todo />} />
                <Route exact path="/notes" element={<div>notes</div>} />
            </Route>
        </Routes>
    )
}
