import Google from './assets/google.svg'
import fb from './assets/facebook.svg'
import git from './assets/github.svg'
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import './App.css'
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const google = new GoogleAuthProvider();
  const Facebook = new FacebookAuthProvider();
  const GitHub = new GithubAuthProvider();

  const googleLogin = () => {
    signInWithPopup(auth, google)
      .then((result) => {
        setUser(result.user)
      }).catch((error) => {
        console.log(error);
      })
  }
  const facebookLogin = () => {
    signInWithPopup(auth, Facebook)
    .then((result)=>{
      setUser(result.user)
      console.log(result.user);
    })
    .catch ((error)=>{
      console.log(error);
    })
  }
  const gitHubLogin = () => {
    signInWithPopup(auth, GitHub)
    .then((result)=> {
      setUser(result.user)
      console.log(result.user);
    }).catch ((error)=> {
      console.log(error);
    })
  }
  const LogOut = () => {
    signOut(auth)
    .then(()=>{
      setUser({});
    }).catch (error =>{
      console.log(error);
    })
  }

  return (
    <>
      <div className="container">

        {
          user.uid ?
            <div className='text-center'>
              <h1 className='text-center mt-5 mb-3 text-secondary'>Account Logged In By <span className='text-primary underline fw-light'>{user.email || user.displayName}</span></h1>
              <button onClick={LogOut} className='btn btn-danger'>Log Out</button>
            </div>
            :
            <>
              <h1 className="text-center text-secondary mt-5">
                Login Your Account By Multiple Sites
              </h1>
              <div className="signup-section d-flex justify-content-center mt-4 g-4">
                <button onClick={googleLogin} className="btn rounded-circle d-flex align-items-center justify-content-center flex-column google fw-semibold"><img src={Google} alt="Google" /> Google</button>
                <button onClick={facebookLogin} className="btn rounded-circle d-flex align-items-center justify-content-center flex-column facebook fw-semibold"><img src={fb} alt="Facebook" /> Facebook</button>
                <button onClick={gitHubLogin} className="btn rounded-circle d-flex align-items-center justify-content-center flex-column github fw-semibold"><img src={git} alt="github" /> Github</button>
              </div>
            </>
        }



        <h2 className="mt-5 text-center text-success">ID Information</h2>
        <div className="idsection d-flex align-items-center justify-content-center">
          <div className="w-50 mx-auto p-5">
            <h4 className='fw-light'>Name: {user.displayName}</h4>
            <h4 className='fw-light'>Email: {user.email}</h4>
            <h4 className='fw-light'>UID: {user.uid}</h4>
          </div>
          <div className="w-50 mx-auto text-center">
            <img className='rounded-circle' src={user.photoURL} alt={user.displayName} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
