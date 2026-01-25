import './App.css'
import { LoginCard } from './components/data/LoginCard'
import { UpdatingUI } from './components/data/UpdatingUI'
import UserComponent from './components/UserComponent'
import UserProfile from './components/UserProfile'



const App = () => {
  return (
    <>
    <h1> State Variable</h1>
    

    <div>
      {/*  name="Clark" age={34} */}
      <UserComponent />
    </div>
    <div>
      <UserProfile />

    </div>

    <div>
      <UpdatingUI />
    </div>

    <div>
      <LoginCard />
    </div>

    
    
    </>
  )
}

export default App







// // //////////////////////////////////////////////////
// import UserProfileDemo from "./UserProfileDemo";

// const App = () => {
//   // Parent component's state (could be passed as props)
//   const bruceUser = {
//     name: "Bruce Wayne",
//     age: 35,
//     email: "bruce@wayne.com"
//   };
  
//   return (
//     <div>
//       <h1>State vs Props Demo</h1>
      
//       {/* Passing data as PROPS */}
//       <UserProfileDemo 
//         initialUser={bruceUser}  // PROP
//         title="User Profile Demo" // Another PROP
//       />
      
//       {/* Another instance with different PROPS */}
//       <UserProfileDemo 
//         initialUser={{ name: "Clark Kent", age: 32, email: "clark@dailyplanet.com" }}
//         title="Second User"
//       />
//     </div>
//   );
// };

// export default App;