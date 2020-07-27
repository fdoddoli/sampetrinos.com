import React, {Component} from 'react';
import BoySummary from './BoySummary';


class Boy extends Component{

    handleClickToChangeBoy = () => {
        this.props.handleClickToChangeBoy();
    }

    handleClickToLikeBoy = () => {
        this.props.handleClickToLikeBoy();
    }

    render(){
        return(
            <div className="boy-section">
                <div className="card center">
                    <BoySummary boy={this.props.boy} handleClickToLikeBoy={this.handleClickToLikeBoy} handleClickToChangeBoy={this.handleClickToChangeBoy} />
                    
                </div>
            </div>
            
        )
    }
    
    
}

export default Boy;