import { formatDate, textStyle } from '../../helpers'
import { style } from '../../helpers'

export default function TodoItem({ task }) {
    return (
        <div
            className={
                'no_drag flex row justify-between items-center bg-gray-500 rounded p-2  text-purple-300'
            }
        >
            <div className={`w-2/12`}>{formatDate(task.date)}</div>
            <div className="w-9/12 text-start">{task.desc}</div>
            <button className="group w-1/12  ">
                <div className="invisible group-hover:visible">X</div>
            </button>
        </div>
    )
}
