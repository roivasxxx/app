import { formatDate, textStyle } from '../../helpers'

export default function TodoItem({ task }) {
    return (
        <div
            className={
                'no_drag flex row justify-start items-center bg-gray-500 rounded p-2  text-purple-300'
            }
        >
            <div>{formatDate(task.date)}</div>
            <div>{task.desc}</div>
        </div>
    )
}
