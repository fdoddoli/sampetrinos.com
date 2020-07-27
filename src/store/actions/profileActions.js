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


