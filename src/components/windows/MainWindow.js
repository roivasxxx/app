import React, { useState, useEffect } from 'react'
import { useData } from '../../context/DataProvider'
import Router from '../../routing/Router'

export default function MainWindow({}) {
    const [text, setText] = useState('init text')
    const [message, setMessage] = useState('')
    const { notes, tasks, dispatch } = useData()

    function handleClick(type) {
        if (type === 0)
            window.electron.get('getData', 'sending data from React')
        else if (type === 1) {
            // window.electron.set([
            //   {
            //     action: "addNew",
            //     collection: "tasks",
            //     data: [{ date: new Date(), desc: "test" }],
            //   },
            // ]);
            // window.electron.set([
            //   {
            //     action: "update",
            //     collection: "tasks",
            //     data: [{ date: new Date(), desc: "testing update function", id: 3 }],
            //   },
            // ]);
            window.electron.set([
                {
                    action: 'delete',
                    collection: 'tasks',
                    data: [5, 8],
                },
            ])
        }
        //console.log("Return value in react: ", returnValue);
    }

    return (
        <div
            className="App bg-gray-600 "
            style={{ height: '100%', width: '100%' }}
        >
            <Router />
        </div>
    )
}
