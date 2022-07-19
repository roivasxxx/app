const Reducer=(state,action)=>{
    console.info(action)
    const {collection,data,id}=action

    const newState={...state}

    switch(action.type){
        case "ADD":
            newState[collection].push(data)
            break;
        case "DELETE":
            newState[collection]=newState[collection].filter((el)=>
                el.id!==id
            );
            break;
        default:
    }

    return newState;
}

export {Reducer}