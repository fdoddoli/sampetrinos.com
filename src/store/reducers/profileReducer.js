const initState = {
    
}

const profileReducer = (state = initState, action) => {
    switch(action.type){
        case 'CHANGED_PROFILE_PICTURE_SUCCESS': 
            console.log('changed profile picture', action.boy);
        case 'CHANGED_PROFILE_PICTURE_SUCCESS_ERROR':
            console.log('changed profile picture error', action.err);
            return state;
        case 'CHANGED_ABOUT_ME_SUCCESS': 
            console.log('changed about me', action.user);
        case 'CHANGED_ABOUT_ME_ERROR':
            console.log('changed about me error', action.err);
            return state;
        case 'CHANGED_SCHOOL_SUCCESS': 
            console.log('changed school', action.user);
        case 'CHANGED_SCHOOL_ERROR':
            console.log('changed school error', action.err);
            return state;
        default:
            return state;
    }
}

export default profileReducer