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

export const createMatch = () => {
    return{

    }
};
