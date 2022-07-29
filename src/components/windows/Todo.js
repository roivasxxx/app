import React from 'react'
import { useData } from '../../context/DataProvider'
import TodoItem from '../general/TodoItem'

export default function Todo() {
    const { tasks } = useData()
    return (
        <div
            style={{ height: window.innerHeight - 70 }}
            className="no_drag  overflow-y-auto mx-5 px-2 "
        >
            <div className=" space-y-2">
                {tasks?.map((task) => (
                    <TodoItem task={task} />
                ))}
            </div>
        </div>
    )
}
