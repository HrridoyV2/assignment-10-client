import React, { useContext } from 'react';
import './Login.css'
import google from '../../logos/google.png'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 
'react-router-dom';
import * as firebase from "firebase/";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config'
import brandLogo from '../../logos/Group 1329.png'
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email} 
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
    }
    return (
        <div className='container w-50'>
            <img src={brandLogo} className='img-fluid'/>
            <br/><br/><br/>
        <div className='login-body px-3 py-5 text-center'>
            <h2>Login With</h2>
            <div onClick={handleGoogleSignIn} className='google'>
            <img src={google} className='p-0'/> 
            <span className='text-center'>continue with Google</span>
            </div>
            <p>Don't have an account?<a href='#'>Create account</a></p>
        </div>
        
            
        </div>
    );
};

export default Login;