import React, {Component} from 'react';
import 'materialize-css/js/collapsible';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import {changedProfilePicture} from '../../store/actions/profileActions';

class ProfileDetails extends Component{
    state = {
        name: '',
        id: '',
        fileName: '',
        imgFile: null,
        isUploading: false,
        progress: 0,
        imgFileURL: ''
    }

    componentDidMount(){
        const elems = window.document.querySelectorAll('.collapsible');
        const options = {}
        window.M.Collapsible.init(elems, options);
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        const {auth} = this.props;
        this.setState({ fileName: filename, progress: 100, isUploading: false, id: auth.uid });
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState({ imgFileURL: url }));
      };

    handleSubmit = (e) => {
        if(this.state.imgFileURL !== '')
            this.props.changedProfilePicture(this.state);
    }
    
    // <a className="waves-effect waves-light btn black"><i class="material-icons left">image</i>Add Image</a>

    render(){
        const {auth, profile} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="container section profle-section">
                <h5 className="center">Profile</h5>
                <div className="divider"></div>
                
                <div className="center">
                    <div className="row">
                        <div className="col s12 m4 l4"></div>
                        <div className="col s12 m4 l4">
                            <div className="card">
                                <div className="card-image">
                                <img src={profile.imgFileURL}/>
                                </div>
                            </div>
                            
                            <div>
                                <div>
                                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                                    {this.state.avatarURL && <img src={this.state.avatarURL} />}
                                    <FileUploader
                                        accept="image/*"
                                        randomizeFilename
                                        storageRef={firebase.storage().ref("images")}
                                        onUploadStart={this.handleUploadStart}
                                        onUploadError={this.handleUploadError}
                                        onUploadSuccess={this.handleUploadSuccess}
                                        onProgress={this.handleProgress}
                                    />
                                </div>
                                <div className="btn-small black change-profile-picture" onClick={this.handleSubmit}>Change Profile Picture</div>
                            </div>

                        </div>
                    </div>
                </div>
                
                
                
                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header">
                            <i className="material-icons">person</i>
                            About Me
                        </div>
                        <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                    </li>
                    <li>
                        <div className="collapsible-header">
                            <i className="material-icons">details</i>
                            Basic Info
                        </div>
                        <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                    </li>
                </ul>
                    
            </div>
        )
    }
    
}
        
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changedProfilePicture: (user) => dispatch(changedProfilePicture(user))
    }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)