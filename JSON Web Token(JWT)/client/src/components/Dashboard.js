import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Dashboard() {

    let storeObj = useSelector((store)=>{
       return store;
    })
  return (
    <div>
      <TopNavigation/>
      <h2>Dashboard</h2>
      <h3>{storeObj.loginDetails.firstName}
      {storeObj.loginDetails.lastName}
      </h3>
      <img src={`http://localhost:1231/${storeObj.loginDetails.profilePic}`}></img>
    </div>
  )
}

export default Dashboard
