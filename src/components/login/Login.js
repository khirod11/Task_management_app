import React,{useState} from 'react'
import app from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    const auth = getAuth(app);
    

    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //Signed In successfully
      const user = userCredential.user;
      console.log("User Logged In Successfully !", user);
      alert("User Logged In Successfully !", user);
      navigate('/home');
    
    }
    catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login Failed", errorCode, errorMessage);
      alert("Login Failed Wrong Credentials", errorCode, errorMessage)
    }

  };

  
  

  return (
    <div className="d-flex align-items-center justify-content-center mt-4" style={{"height" : "80vh"}}>
      <form className="bg-primary-subtle p-5">
        <div className="mb-3">
          <h4 className='d-flex justify-content-center border border-primary mb-2 bg-success-subtle'>LOGIN</h4>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='ms-5' >
        <button type="button" className="btn btn-primary ms-4" onClick={handleLogin}>
          Login
        </button>
        </div>
        <div className="my-3">
          <Link to='/' className=" d-flex my-3 ms-3 justify-content-center">New User ? Register</Link>
        </div>
        <div className='my-3'>
          <Link to='/passwordreset' className=' d-flex my-3 ms-3 justify-content-center'> Forgot Password</Link>
        </div>
      </form>
    </div>
  )
}

export default Login