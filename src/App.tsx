import './App.css'
import { Alert } from './components/Alert'
import { CustomButton } from './components/events/CustomEvents'
import FlexboxMindsetShift from './components/FlexboxMindsetShift'



const App = () => {
  return (
    <>
    <Alert>
      "Your changes have been saved"
    </Alert>
    {/* events */}
    <h1>Events Handling</h1>
    <span>Responding to Events</span>
    <ul><li>✨Declaring a function that will respond when event is executed</li> 
       <li>✨Events in react.js must start with on and will be written in camelCase like onClick, onChange, onSubmit </li>
        
    </ul>
    <div>
    <CustomButton />
    </div>
    <div>
    <FlexboxMindsetShift />
    </div>
    
    </>
  )
}

export default App










// // import './App.css'
// import UserProfile from "./components/UserProfile";


// export default function App() {
//   return (
//     <>
//     <div>
//       <h1>App </h1>

//     <UserProfile 
//   name="John"      // ✅ From UserProfileProps
//   age={25}         // ✅ From UserProfileProps  
//   key="user-123"   // ✅ From IntrinsicAttributes
  
// />

//     {/* <UserProfile name="Michal" age={20} /> */}

//       </div>

//     </>
//   )
// }


// <div>
      // <UserProfile name="Parker" />
    // </div>







// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import UserProfile from './components/UserProfile'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
    
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
