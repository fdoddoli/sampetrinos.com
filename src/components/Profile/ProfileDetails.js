import React, {Component} from 'react';
import 'materialize-css/js/collapsible';
import 'materialize-css/js/modal';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import {changedProfilePicture, changedAboutMe, changedSchool} from '../../store/actions/profileActions';

class ProfileDetails extends Component{
    state = {
        name: '',
        id: this.props.auth.uid,
        fileName: '',
        imgFile: null,
        isUploading: false,
        progress: 0,
        imgFileURL: '',
        aboutMe: this.props.profile.aboutMe,
        school: this.props.profile.school
    }

    componentDidMount(){
        const elems = window.document.querySelectorAll('.collapsible');
        const options = {}
        window.M.Collapsible.init(elems, options);

        const elems2 = window.document.querySelectorAll('.modal');
        const options2 = {}
        window.M.Modal.init(elems2, options2);
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        const {auth} = this.props;
        this.setState({ fileName: filename, progress: 100, isUploading: false});
        firebase
          .storage()
          .ref("images")
          .child(filename)
          .getDownloadURL()
          .then(url => this.setState({ imgFileURL: url }));
      };

    handleSubmitProfilePicture = () => {
        if(this.state.imgFileURL !== '')
            this.props.changedProfilePicture(this.state);
    }

    handleSubmitAboutMe = (e) => {
        e.preventDefault();
        this.props.changedAboutMe(this.state)
    }

    handleChangeAboutMe = (e) => {
        this.setState({
            aboutMe: e.target.value
        })
    }

    handleChangeSchool = (e) => {
        this.setState({
            school: e.target.value
        })
    }

    handleSubmitSchool = (e) => {
        e.preventDefault();
        this.props.changedSchool(this.state)
    }


    
    // <a className="waves-effect waves-light btn black"><i class="material-icons left">image</i>Add Image</a>

    render(){


        const {auth, profile} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        const schoolEducationButton = this.state.school == '' ? (
            <div className="school">
                <a class="waves-effect waves-light btn modal-trigger button-blue blue-hover" href="#modal1">Add School</a>
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h5 className="bold">Add School</h5>
                        <div className="input-field">
                            <label htmlFor="school">School</label>
                            <input type="text" id="school" onChange={this.handleChangeSchool}/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button className="modal-close waves-effect waves-light btn button-blue blue-hover" onClick={this.handleSubmitSchool}>Save</button>
                    </div>
                </div>
            </div>                   
        ) : (
            <div className="school">
            <a class="waves-effect waves-light btn modal-trigger button-blue blue-hover" href="#modal1">{this.props.profile.school}</a>
                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h5 className="bold">Edit School</h5>
                        <div className="input-field">
                            <label htmlFor="school">School</label>
                            <input type="text" id="school" onChange={this.handleChangeSchool}/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button className="modal-close waves-effect waves-light btn button-blue blue-hover" onClick={this.handleSubmitSchool}>Save</button>
                    </div>
                </div>
            </div>
        )

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
                                <div className="btn-small black change-profile-picture" onClick={this.handleSubmitProfilePicture}>Change Profile Picture</div>
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
                        <div className="collapsible-body">
                        <div>
                            <form onSubmit={this.handleSubmitAboutMe}>
                                <div className="input-field">
                                    <label htmlFor="aboutMe">{this.state.aboutMe}</label>
                                    <input type="text" id="aboutMe" onChange={this.handleChangeAboutMe}/>
                                    <button class="btn waves-effect waves-light button-blue blue-hover" type="submit" name="action">Save</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div className="collapsible-header">
                            <i className="material-icons">details</i>
                            Education
                        </div>
                        <div className="collapsible-body">
                            {schoolEducationButton}
                        </div>
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
        changedProfilePicture: (user) => dispatch(changedProfilePicture(user)),
        changedAboutMe: (user) => dispatch(changedAboutMe(user)),
        changedSchool: (user) => dispatch(changedSchool(user))
    }
}
    

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)