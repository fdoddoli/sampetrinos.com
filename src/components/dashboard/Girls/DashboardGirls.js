import React, {Component} from 'react';
import Notifications from './Notifications';
import Boy from './Boy';
import {connect} from 'react-redux';
import {likeBoy} from '../../../store/actions/boyActions';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

class DashboardGirls extends Component{
    
    state = {
        idBoy: '',
        idGirl: '',
        firstName: 'Rodrigo Miñaro',
        imgFileURL: '/img/test.JPG'
        
    }

    handleClickToChangeBoy = (e) => {
        const {boys} = this.props;
        let boy = boys[Math.floor(Math.random() * boys.length)];
        this.setState({ 
            idBoy: boy.id,
            firstName: boy.firstName,
            imgFileURL: boy.imgFileURL
        });
    }

    handleClickToLikeBoy = (e) => {
        const {boys, auth} = this.props;
        let boy = boys[Math.floor(Math.random() * boys.length)];
        this.setState({
            idBoy: boy.id,
            idGirl: auth.uid,
            firstName: boy.firstName,
            imgFileURL: boy.imgFileURL
        });
        this.props.likeBoy(this.state);
    }

    render(){
        const {boys, auth, boysWhoMatchWithMe} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div class="row">
                    <div class="col s12 m5 l6"> 
                        <Notifications boysWhoMatchWithMe={boysWhoMatchWithMe}/>
                    </div>
                    
                    <div class="col s12 m7 l6"> 
                        <Boy boy={this.state} handleClickToLikeBoy={this.handleClickToLikeBoy} handleClickToChangeBoy={this.handleClickToChangeBoy}/>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const users = state.firestore.ordered.users || state.boy.boys;
    const matches = state.firestore.ordered.matches || state.boy.boys;
    const auth = state.firebase.auth;
    const uid = auth.uid;
    const gender = 'Male';
    
    const boys = users.filter(boy => {
        if(boy.gender == gender) return boy;
        
    });
    console.log(boys);

    //Matches USER HAS
    const myMatches = matches.filter(match => {
        if(match.idUserGirl == uid && match.status == true) return match;      
    });
    console.log(myMatches);

    //Boys WHO MATCHED WITH THIS USER
    const boysWhoMatchWithMe = [];
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < myMatches.length; j++) {
            if (users[i].id == myMatches[j].idUserBoy) {
                boysWhoMatchWithMe.push(users[i])
            }
        }
    }
    console.log(boysWhoMatchWithMe);

    return{
        boys: boys,
        boysWhoMatchWithMe: boysWhoMatchWithMe,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        likeBoy: (boy) => dispatch(likeBoy(boy))
    }
}
//we can do a mapstatetoprops for the whole user collection
//and store the boys in a variable and give that to props
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'matches'}
    ]),
)(DashboardGirls)
