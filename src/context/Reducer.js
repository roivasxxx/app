const Reducer = (state, action) => {
    console.info(action)
    const { collection, data, id } = action

    let newState = { ...state }

    switch (action.type) {
        case 'ADD':
            newState[collection].push(data)
            break
        case 'DELETE':
            newState[collection] = newState[collection].filter(
                (el) => el.id !== id
            )
            break
        case 'INIT':
            return action.data
            break
        default:
    }

    return newState
}

export { Reducer }
