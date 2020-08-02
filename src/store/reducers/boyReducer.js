
const initState = {
    boys: [
        {id: '1', score: '1', firstName: 'Fernando Doddoli', imgFileURL: '/img/test.JPG'},
        {id: '2', score:'1', firstName: 'Daniel Guerra', imgFileURL: '/img/test2.jpg'},
        {id: '3', score:'1', firstName: 'David Sada', imgFileURL: '/img/test3.jpg'},
        {id: '4', score:'1', firstName: 'Eduardo Castro', imgFileURL: '/img/test4.jpg'},
        {id: '5', score:'1', firstName: 'Alberto Pirrut', imgFileURL: '/img/test5.jpg'}
    ]
}

const boyReducer = (state = initState, action) => {
    switch(action.type){
        case 'LIKE_BOY': 
            console.log('liked boy', action.boy);
            return state;
        case 'LIKE_BOY_ERROR':
            console.log('like boy error', action.err);
            return state;
        case 'LIKE_GIRL': 
            console.log('liked girl', action.match);
            return state;
        case 'LIKE_GIRL_ERROR':
            console.log('like girl error', action.err);
            return state;
        case 'DELETE_MATCH': 
            console.log('match deleted', action.match);
            return state;
        case 'DELETE_MATCH_ERROR':
            console.log('match deleted error', action.err);
        case 'ADD_BOY_TO_BOYS_NOT_TO_DISPLAY': 
            console.log('added boy to array', action.boy);
            return state;
        case 'ADD_BOY_TO_BOYS_NOT_TO_DISPLAY_ERROR':
            console.log('added boy to array error', action.err);
            return state;
        default:
            return state;
    }
}

export default boyReducer