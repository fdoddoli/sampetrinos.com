export const signIn = (credentials) => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( () => {
            dispatch({ type: 'LOGIN_SUCCESS'})
        }).catch( (err) => {
            dispatch({ type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    return(dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGN_OUT_SUCCESS'});
        });
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                gender: newUser.gender,
                imgFileURL: 'https://firebasestorage.googleapis.com/v0/b/sampetrinos.appspot.com/o/images%2F6b8d7108-bc99-40b0-900d-9cfbdf1a0401.png?alt=media&token=41eb2c57-df81-494c-b17a-77201c701694',
                aboutMe: '',
                school: '',
                //boysNotToDisplay: [{id: '', firstName:'', lastName:'', gender:'', imgFileURL:'', aboutMe:'', school:''}],
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCESS'})
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}