import React, {Component} from 'react';
import Notifications from './NotificationsBoys';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {likeGirl} from '../../../store/actions/boyActions';
import {deleteMatch} from '../../../store/actions/boyActions';

class DashboardBoys extends Component{
    state = {
        firstName: '',
        imgFileURL: '',
        idUserGirl: '',
        idUserBoy: '',
        school: ''
    }
    
    handleClickShowGirlWhoLikedUser = (girl) => {
        const {auth} = this.props;
    
        this.setState({ 
            firstName: girl.firstName,
            imgFileURL: girl.imgFileURL,
            idUserGirl: girl.id,
            idUserBoy: auth.uid,
            school: girl.school
        })
    }

    handleClickLikeGirlWhoLikedUser = (girl) => {
        console.log(this.state);
        const {myLikes} = this.props;
        //Returns the match that this user wants to make true
        const myFutureMatch = myLikes.filter(match => {
            if(match.idUserBoy == this.state.idUserBoy && match.status == false && match.idUserGirl == this.state.idUserGirl) return match;      
        });
        //makes match true
        this.props.likeGirl(myFutureMatch);
        
        //clear
        this.handleClickStopShowingGirlWhoLikedUser();

    }


    handleClickStopShowingGirlWhoLikedUser = (e) => {
        this.setState({ 
            firstName: '',
            imgFileURL: '',
            idUserGirl: '',
            school: ''
        })
    }

    handleClickStopShowingGirlWhoLikedUserAndDeleteMatch = (e) => {
        const {myLikes} = this.props;
        
        //Returns the 'match'(status:false) that this user wants to delete
        const matchIWantToDelete = myLikes.filter(match => {
            if(match.idUserBoy == this.state.idUserBoy && match.status == false && match.idUserGirl == this.state.idUserGirl) return match;      
        });
        
        //Deletes match
        this.props.deleteMatch(matchIWantToDelete);
        
        //clear
        this.handleClickStopShowingGirlWhoLikedUser();
    }

    


    render(){
        const rightDashboard = this.state.firstName !== '' ? (
            <div className="card center dashboard-girl">
                <div className="card-image  center">
                    <img className="responsive-img" src={this.state.imgFileURL}/>
                </div>
                <div className="card-content">
                    <h5 className="boy-name">{this.state.firstName}</h5>
                    <p className="girl-school blue-text">{this.state.school}</p>
                    <button className="waves-effect btn-floating waves-light btn-large white" onClick={this.handleClickStopShowingGirlWhoLikedUserAndDeleteMatch}><i class="large material-icons grey-text">close</i></button>
                    <button className="waves-effect btn-floating waves-light btn-large white" onClick={this.handleClickLikeGirlWhoLikedUser}><i class="large material-icons blue-text text-darken-4">check</i></button>
                </div>
            </div>
        ) : (
            <div className="section center intro-text">
                <h5 className="black-text intro-text">Got any matches? Click on them to Start Chatting</h5>
                <i class="medium material-icons blue-color-accent">mood</i>
            </div>
        )

        const {auth, girlsWhoMatchWithMe, girlsWhoLikeMe} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5 l6"> 
                        <Notifications girlsWhoLikeMe={girlsWhoLikeMe} girlsWhoMatchWithMe={girlsWhoMatchWithMe} handleClickShowGirlWhoLikedUser={this.handleClickShowGirlWhoLikedUser}/>
                    </div>
                    
                    <div className="col s12 m7 l6"> 
                        {rightDashboard}
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
        myLikes: myLikes,
        girlsWhoLikeMe: girlsWhoLikeMe,
        girlsWhoMatchWithMe: girlsWhoMatchWithMe,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        likeGirl: (myFutureMatch) => dispatch(likeGirl(myFutureMatch)),
        deleteMatch: (matchIWantToDelete) => dispatch(deleteMatch(matchIWantToDelete))
    }
}
  

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'matches'},
        {collection: 'users'}
    ]),
)(DashboardBoys)

