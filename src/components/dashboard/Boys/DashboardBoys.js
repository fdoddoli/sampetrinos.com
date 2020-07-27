import React, {Component} from 'react';
import Notifications from './NotificationsBoys';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class DashboardBoys extends Component{
    render(){
        const {auth, girlsWhoMatchWithMe, girlsWhoLikeMe} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5 l6"> 
                        <Notifications girlsWhoLikeMe={girlsWhoLikeMe} girlsWhoMatchWithMe={girlsWhoMatchWithMe}/>
                    </div>
                    
                    <div className="col s12 m7 l6"> 
                        <div className="section center intro-text">
                            <h5 className="black-text intro-text">Got any matches? Click on them to Start Chatting</h5>
                            <i class="medium material-icons red-text text-accent-3">mood</i>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    
    const matches = state.firestore.ordered.matches || state.boy.boys;
    const users = state.firestore.ordered.users || state.boy.boys
    const auth = state.firebase.auth;
    const uid = auth.uid;
    
    //LIKES THIS USER HAS
    const myLikes = matches.filter(like => {
        if(like.idUserBoy == uid && like.status == false) return like;      
    });
    console.log(myLikes);

    //GIRLS WHO LIKED THIS USER
    const girlsWhoLikeMe = [];
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < myLikes.length; j++) {
            if (users[i].id == myLikes[j].idUserGirl) {
                girlsWhoLikeMe.push(users[i])
            }
        }
    }
    console.log(girlsWhoLikeMe);

    //Matches USER HAS
    const myMatches = matches.filter(match => {
        if(match.idUserBoy == uid && match.status == true) return match;      
    });
    console.log(myMatches);

    //GIRLS WHO MATCHED WITH THIS USER
    const girlsWhoMatchWithMe = [];
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < myMatches.length; j++) {
            if (users[i].id == myMatches[j].idUserGirl) {
                girlsWhoMatchWithMe.push(users[i])
            }
        }
    }
    console.log(girlsWhoMatchWithMe);
    
    return{
        girlsWhoLikeMe: girlsWhoLikeMe,
        girlsWhoMatchWithMe: girlsWhoMatchWithMe,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'matches'},
        {collection: 'users'}
    ]),
)(DashboardBoys)

