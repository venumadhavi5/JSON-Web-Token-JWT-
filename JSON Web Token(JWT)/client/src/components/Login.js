import React, { useEffect, useRef } from 'react';
import { Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function Login() {

    let emailInputRef = useRef();
    let passwordInputRef = useRef();

    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{

      if(localStorage.getItem("token") ){

        sendTokenToServer()

      }
      
    },[]);

    let sendTokenToServer = async ()=>{
      let dataToSend =new FormData();
      dataToSend.append("token",localStorage.getItem("token"));

      let reqOptions = {
        method:"POST",
        body:dataToSend,
      }

      let JSONData = await fetch("http://localhost:1231/validateToken", reqOptions);

      let JSOData = await JSONData.json();
      if(JSOData.status === "failure"){
        alert(JSOData.msg);
    }else{

      localStorage.setItem("token",JSOData.data.token);
      
       dispatch({type:"login", data:JSOData.data});
       navigate("/dashboard")
   }

      console.log(JSOData);
    }

    let onLogin = async ()=>{

        let dataToSend = new FormData();
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);


        let reqOptions = {
            method:"POST",
            body:dataToSend,
        }


        let JSONData = await fetch("http://localhost:1231/login",reqOptions);
        let JSOData = await JSONData.json();

       

        if(JSOData.status === "failure"){
            alert(JSOData.msg);
        }else{

          localStorage.setItem("token",JSOData.data.token);
          
           dispatch({type:"login", data:JSOData.data});
           navigate("/dashboard")
       }
        console.log(JSOData);
    }
  return (
    <div>
      <h2>Login</h2>
      <form>
      <div>
        <label>Email</label>
        <input ref={emailInputRef}></input>
      </div>
      <div>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
      </div>
      <div>
      <button type='button' onClick={()=>{
        onLogin();
      }}>Login</button>
      </div>
      </form>
      <div>
      <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login
