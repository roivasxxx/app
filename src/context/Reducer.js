const Reducer = (state, action) => {
    const { collection, data, id } = action

    // let newState = { ...state }

    switch (action.type) {
        case 'ADD':
            window.electron.test([
                {
                    action: 'addNew',
                    collection: 'tasks',
                    data: [data],
                },
            ])
            console.debug('ADD')
            break
        case 'DELETE':
            window.electron.set([
                {
                    action: 'delete',
                    collection: 'tasks',
                    data: [data],
                },
            ])
            break
        case 'TEST':
            console.debug('TEST')
            break
        default:
            console.info('DEFAULT ACTION')
            return action.data
    }

    return state
}

export { Reducer }
