import React, {Component} from 'react';
import 'materialize-css/js/collapsible';


class Notifications extends Component{
    
    componentDidMount(){
        const elems = window.document.querySelectorAll('.collapsible');
        const options = {}
        window.M.Collapsible.init(elems, options);
    }

    render(){
        const matchLikeLength = this.props.boysWhoMatchWithMe.length;
        const matchList = matchLikeLength ? (
            this.props.boysWhoMatchWithMe.map(match => {
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
            <div className="matches">
                <h5 className="black-tex title-sub-notifications">Matches</h5>
                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header">
                        <i className="material-icons">people</i>
                        Check my matches
                        <span className="badge red accent-3 white-text">2</span></div>
                        <div className="collapsible-body">
                            {matchList}
                        </div>
                    </li>
                </ul>
            </div>
      
            <div className="Conversations">
                    <h5 className="black-text title-sub-notifications">Conversations</h5>
                    <div className="collection">
                        <a href="#!" className="collection-item notification-item avatar black-text">
                            <img className="circle" src="/img/test.JPG"/>
                            <span className=" new badge red accent-3">1</span>
                            <p className="name-notifications">Alan</p>
                            <p className="grey-text">hahahaha sí</p>
                        </a>
                        <a href="#!" className="collection-item notification-item avatar black-text">
                            <img className="circle" src="/img/test.JPG"/>
                            <span className=" new badge red accent-3">3</span>
                            <p className="name-notifications">Alan</p>
                            <p className="grey-text">hahahaha sí</p>
                        </a>
                        <a href="#!" className="collection-item notification-item avatar black-text">
                            <img className="circle" src="/img/test.JPG"/>
                            <span className=" new badge red accent-3">5</span>
                            <p className="name-notifications">Alan</p>
                            <p className="grey-text">hahahaha sí</p>
                        </a>
                        <a href="#!" className="collection-item notification-item avatar black-text">
                            <img className="circle" src="/img/test.JPG"/>
                            <span className=" new badge red accent-3">2</span>
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