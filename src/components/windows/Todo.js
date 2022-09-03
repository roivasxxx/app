import React, { useCallback } from 'react'
import { useData } from '../../context/DataProvider'
import TodoItem from '../general/TodoItem'

export default function Todo() {
    const { tasks, dispatch } = useData()

    const click = useCallback(() => {
        dispatch({
            type: 'ADD',
            data: [],
            collection: 'tasks',
        })
    }, [])

    return (
        <div
            style={{ height: window.innerHeight - 70 }}
            className="no_drag  overflow-y-auto mx-5 px-2 "
        >
            <div className="w-2/3 m-20 hover:text-white-500">
                <button onClick={click}>test</button>
            </div>
            <div className=" space-y-2">
                {tasks?.map((task) => (
                    <TodoItem task={task} />
                ))}
            </div>
        </div>
    )
}
