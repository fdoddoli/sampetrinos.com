export const changedProfilePicture = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        let data = firestore;
        firestore.collection("users").doc(user.id).update({
            imgFileURL: user.imgFileURL
        }).then(() => {
            dispatch({type: 'CHANGED_PROFILE_PICTURE_SUCCESS', user: user});
        }).catch((err) => {
            dispatch({type: 'CHANGED_PROFILE_PICTURE_ERROR', err});
            })
        };  
};

export const changedAboutMe = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection("users").doc(user.id).update({
            aboutMe: user.aboutMe
        }).then(() => {
            dispatch({type: 'CHANGED_ABOUT_ME_SUCCESS', user: user});
        }).catch((err) => {
            dispatch({type: 'CHANGED_ABOUT_ME_ERROR', err});
            })
        };  
};

export const changedSchool = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection("users").doc(user.id).update({
            school: user.school
        }).then(() => {
            dispatch({type: 'CHANGED_SCHOOL_SUCCESS', user: user});
        }).catch((err) => {
            dispatch({type: 'CHANGED_SCHOOL_ERROR', err});
            })
        };  
};


