const initState = {
    
}

const profileReducer = (state = initState, action) => {
    switch(action.type){
        case 'CHANGED_PROFILE_PICTURE_SUCCESS': 
            console.log('changed profile picture', action.boy);
        case 'CHANGED_PROFILE_PICTURE_SUCCESS_ERROR':
            console.log('changed profile picture error', action.err);
            return state;
        default:
            return state;
    }
}

export default profileReducer