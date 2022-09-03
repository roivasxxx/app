import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CustomIcon from '../components/general/CustomIcon'
import performWindowAction from '../components/general/WindowActions'

const textStyle = 'text-purple-300 hover:text-purple-500'

const FrameActionBar = () => {
    const iconSize = 16

    return (
        <div className={'flex row justify-around items-center my-2'}>
            <CustomIcon
                icon="minify"
                size={iconSize}
                className={textStyle}
                clickable
                onClick={() => performWindowAction('minify')}
            />
            <CustomIcon
                icon="maximize"
                size={iconSize}
                className={textStyle}
                clickable
                onClick={() => performWindowAction('maximize')}
            />
            <CustomIcon
                icon="close"
                size={iconSize}
                className={textStyle}
                clickable
                onClick={() => performWindowAction('close')}
            />
        </div>
    )
}

const OutletWrapper = () => (
    <div>
        <Outlet />
    </div>
)

export default function NavBar() {
    return (
        <div className="w-full">
            <div className="mb-2">
                <div className="m-auto flex row justify-between border-b-2 border-purple-300">
                    <div className="no_drag m-2 w-10/12 flex row justify-around items-center bg-gray-600">
                        <Link to="/">
                            <h2 className={textStyle}>Home</h2>
                        </Link>
                        <Link to="/todo">
                            <h2 className={textStyle}>To-do</h2>
                        </Link>
                        <Link to="/notes">
                            <h2 className={textStyle}>Notes</h2>
                        </Link>
                    </div>
                    <FrameActionBar />
                </div>
            </div>
            <OutletWrapper />
        </div>
    )
}
