//Lets the database know which boys a girl likes
export const likeBoy = (boy) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('matches').add({
            idUserBoy: boy.idBoy,
            idUserGirl: boy.idGirl,
            createdAt: new Date(),
            status: false
        }).then( () => {
            dispatch({type: 'LIKE_BOY', boy});
        }).catch( (err) => {
            dispatch({type: 'LIKE_BOY_ERROR', err});
        })
        
    }
};

export const likeGirl = (myFutureMatch) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("matches").doc(myFutureMatch[0].id).update({
            status: true
        }).then(() => {
            dispatch({type: 'LIKE_GIRL', match: myFutureMatch});
        }).catch((err) => {
            dispatch({type: 'LIKE_GIRL_ERROR', err});
            })
        }; 
}

export const deleteMatch = (matchIWantToDelete) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("matches").doc(matchIWantToDelete[0].id).delete()
        .then(() => {
            dispatch({type: 'DELETE_MATCH', match: matchIWantToDelete});
        }).catch((err) => {
            dispatch({type: 'DELETE_MATCH_ERROR', err});
            })
        }; 
}

export const addBoyToBoysNotToDisplay = (boy) => {
    return (resp, dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection("users").doc(resp.user.uid).update({
            boysNotToDisplay: firebase.firestore.FieldValue.arrayUnion(boy)
        }).then(() => {
            dispatch({type: 'ADD_BOY_TO_BOYS_NOT_TO_DISPLAY', boy: boy});
        }).catch((err) => {
            dispatch({type: 'ADD_BOY_TO_BOYS_NOT_TO_DISPLAY_ERROR', err});
            })
        }; 
}

