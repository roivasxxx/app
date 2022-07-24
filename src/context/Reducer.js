const Reducer = (state, action) => {
    const { collection, data, id } = action

    let newState = { ...state }

    switch (action.type) {
        case 'ADD':
            window.electron.set([
                {
                    action: 'addNew',
                    collection: 'tasks',
                    data: [data],
                },
            ])
            break
        case 'DELETE':
            newState[collection] = newState[collection].filter(
                (el) => el.id !== id
            )
            break
        case 'INIT':
            console.info('INIT REDUCER')
            return action.data
        default:
    }

    return newState
}

export { Reducer }
