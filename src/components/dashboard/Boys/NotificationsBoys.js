import React, {Component} from 'react';
import 'materialize-css/js/collapsible';

class Notifications extends Component{
    
    componentDidMount(){
        const elems = window.document.querySelectorAll('.collapsible');
        const options = {}
        window.M.Collapsible.init(elems, options);
    }
    
    render(){
        
        const likeListLength = this.props.girlsWhoLikeMe.length;
        const matchLikeLength = this.props.girlsWhoMatchWithMe.length;
        
        const likeList = likeListLength ? (
            this.props.girlsWhoLikeMe.map(like => {
                return(
                    <div class="collection">
                        <a href="#!" class="collection-item notification-item avatar black-text">
                            <img className="circle" src={like.imgFileURL}/>
                            <p className="name-notifications">{like.firstName}</p> 
                        </a>
                        <div className="divider"></div>            
                    </div>
                    
                )
            })
        ) : (
            <div class="collection">
                <p>No likes yet</p>
            </div>
        )
        
        const matchList = matchLikeLength ? (
            this.props.girlsWhoMatchWithMe.map(match => {
                return(
                    <div class="collection">
                        <a href="#!" class="collection-item notification-item avatar black-text">
                            <img className="circle" src={match.imgFileURL}/>
                            <p className="name-notifications">{match.firstName}</p>
                        </a>
                        <div className="divider"></div>
                    </div> 
                )
            })
        ) : (
            <div class="collection">
                <p>No matches yet</p>
            </div>
        )

        return(
            <div className="notifications">
                <div className="Likes">
                    <h5 className="black-tex title-sub-notifications">Likes</h5>
                    <ul class="collapsible">
                        <li>
                            <div class="collapsible-header">
                            <i class="material-icons">favorite</i>
                            See who liked you
                            <span class="badge red accent-3 white-text">{likeListLength}</span></div>
                            <div class="collapsible-body">
                                {likeList}
                            </div>
                        </li>
                    </ul>
                </div>


                <div className="Matches">
                    <h5 className="black-tex title-sub-notifications">Matches</h5>
                    <ul class="collapsible">
                        <li>
                            <div class="collapsible-header">
                            <i class="material-icons">people</i>
                            Check my matches
                            <span class="badge red accent-3 white-text">{matchLikeLength}</span></div>
                            <div class="collapsible-body">
                                {matchList}
                            </div>
                        </li>
                    </ul>
                </div>
            
                <div className="Conversations">
                        <h5 className="black-text title-sub-notifications">Conversations</h5>
                        <div class="collection">
                            <a href="#!" class="collection-item notification-item avatar black-text">
                                <img className="circle" src="/img/test.JPG"/>
                                <span class=" new badge red accent-3">1</span>
                                <p className="name-notifications">Alan</p>
                                <p className="grey-text">hahahaha sí</p>
                            </a>
                            <a href="#!" class="collection-item notification-item avatar black-text">
                                <img className="circle" src="/img/test.JPG"/>
                                <span class=" new badge red accent-3">3</span>
                                <p className="name-notifications">Alan</p>
                                <p className="grey-text">hahahaha sí</p>
                            </a>
                            <a href="#!" class="collection-item notification-item avatar black-text">
                                <img className="circle" src="/img/test.JPG"/>
                                <span class=" new badge red accent-3">5</span>
                                <p className="name-notifications">Alan</p>
                                <p className="grey-text">hahahaha sí</p>
                            </a>
                            <a href="#!" class="collection-item notification-item avatar black-text">
                                <img className="circle" src="/img/test.JPG"/>
                                <span class=" new badge red accent-3">2</span>
                                <p className="name-notifications">Alan</p>
                                <p className="grey-text">hahahaha sí</p>
                            </a>
                        </div>
                </div>

            </div>
        )
    }
}
    

export default Notifications