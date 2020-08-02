import React, {Component} from 'react';
import Notifications from './Notifications';
import Boy from './Boy';
import {connect} from 'react-redux';
import {likeBoy} from '../../../store/actions/boyActions';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {addBoyToBoysNotToDisplay} from '../../../store/actions/boyActions';

class DashboardGirls extends Component{
    
    state = {
        idBoy: '',
        idGirl: this.props.auth.uid,
        firstName: 'Rodrigo Miñaro',
        imgFileURL: '/img/test.JPG',
        school: ''
        
    }

    /*
    boyToDisplay = (boys, boysNotToDisplay) => {
        //tengo el arreglo de boys not to display y el arrelgo de boys
        //recore boys y checar si esta en el arreglo 
        //de boys not to display usando include
        
        for (var i = 0; i < boys.length; i++) {
            boys[i].id !== boysNotToDisplay
        }
        
       
    }
    */

    handleClickToChangeBoy = (e) => {
        const {boys, auth} = this.props;
        //Cuando hace un like o X, update el arreglo de boys not to display
        //let boy = this.boyToDisplay();
        let boy = boys[Math.floor(Math.random() * boys.length)];
        this.setState({ 
            idBoy: boy.id,
            idGirl: auth.uid,
            firstName: boy.firstName,
            imgFileURL: boy.imgFileURL,
            school: boy.school
        });
        //call dispatch to update array of boysNottoDisplay
        //console.log(boy)
        //this.props.addBoyToBoysNotToDisplay(boy);
    }

    handleClickToLikeBoy = (e) => {
        this.props.likeBoy(this.state);
        const {boys, auth} = this.props;
        //let boy = this.boyToDisplay();
        let boy = boys[Math.floor(Math.random() * boys.length)];
        this.setState({
            idBoy: boy.id,
            idGirl: auth.uid,
            firstName: boy.firstName,
            imgFileURL: boy.imgFileURL,
            school: boy.school
        });
        //call dispatch to update array of boysNottoDisplay
        //this.props.addBoyToBoysNotToDisplay(boy);
    }

    render(){
        const {boys, auth, boysWhoMatchWithMe, profile} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        if(boys){
            //this.boyToDisplay(boys, profile.boysNotToDisplay) 
        }
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
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        likeBoy: (boy) => dispatch(likeBoy(boy)),
        addBoyToBoysNotToDisplay: (boy) => dispatch(addBoyToBoysNotToDisplay(boy))
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
