
import React, { useState } from "react";
import app, { db } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { ref, set } from "@firebase/database";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Registration successfully
      const user = userCredential.user;
      console.log("User registered successfully!", user);
      alert("User Registered Successfully", user);


      set(ref(db, 'users/' + user.uid), {
        email: email,
        id:user.uid
      });

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Registration failed", errorCode, errorMessage);
      alert("Registration failed",errorCode, errorMessage)
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5 " style={{"height" : "80vh"}}>
      <form className="bg-primary-subtle p-5 border border-primary">
        <div className="mb-3">
        <h4 className='d-flex justify-content-center border border-primary mb-2 bg-success-subtle'>REGISTER</h4>

          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address :
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
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="ms-5">
        <button type="button" className="btn btn-primary ms-3" onClick={handleRegister}>
          Register
        </button>
        </div>
        <div className="my-3">
          <Link to='/login' className="my-3 ms-3">Already a User ? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
