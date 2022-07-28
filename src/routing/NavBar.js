import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CustomIcon from '../components/general/CustomIcon'

const textStyle = 'text-purple-300 hover:text-purple-500'

const FrameActionBar = () => {
    const iconSize = 16

    return (
        <div className={'flex row justify-around items-center my-2'}>
            <CustomIcon icon="minify" size={iconSize} className={textStyle} />
            <CustomIcon icon="maximize" size={iconSize} className={textStyle} />
            <CustomIcon icon="close" size={iconSize} className={textStyle} />
        </div>
    )
}

export default function NavBar() {
    return (
        <>
            <div className="flex row justify-around items-center my-2 bg-gray-600">
                <Link to="/">
                    <h2 className={textStyle}>Home</h2>
                </Link>
                <Link to="/todo">
                    <h2 className={textStyle}>To-do</h2>
                </Link>
                <Link to="/notes">
                    <h2 className={textStyle}>Notes</h2>
                </Link>
                <FrameActionBar />
            </div>
            <Outlet />
        </>
    )
}
