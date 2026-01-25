import { useState } from "react";

interface User {
  name: string;
  age: number;
  email: string;
  address: {
    city: string;
    country: string;
  }
}

const UserProfile = () => {
  const [user, setUser] = useState<User>({
    name: "Bruce",
    age: 30,
    email: "bruce@example.com",
    address: {
      city: "Lahore",
      country: "Pakistan"
    }
  });

  const updateName = () => {
    setUser({
      ...user, 
      name: "Clark"  // Only update name, leave address as is
    });
  };

  const updateAddress = () => {
    setUser({
      ...user, 
      address: {
        ...user.address,
        city: "Dubai",
        country: "UAE"
      }
    });
  };

  const updateNameAndAddress = () => {
    setUser({
      ...user, 
      name: "Clark",
      address: {
        city: "Karachi",
        country: "Pakistan"
      }
    });
  };

  return (
    <div>
      <h2>Name: {user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <p>
        Address: <br />
        {user.address.city} <br />
        {user.address.country}
      </p>

      <button onClick={updateName}>Change Name to Clark</button>
      <button onClick={updateAddress}>Move to Dubai (Keep Name)</button>
      <button onClick={updateNameAndAddress}>Change Name & Move to Karachi</button>
    </div>
  );
};

export default UserProfile;












// import React, { useState } from 'react';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   isActive: boolean;
// }

// const UserProfile: React.FC = () => {
//   // Step 1: Initialize state
//   const [user, setUser] = useState<User>({
//     id: 1,
//     name: 'John Doe',
//     email: 'john@example.com',
//     age: 30,
//     isActive: true,
//   });

//   // Step 2: Update functions
//   const updateName = () => {
//     setUser(prev => ({ ...prev, name: 'Jane Doe' }));
//   };

//   const incrementAge = () => {
//     setUser(prev => ({ ...prev, age: prev.age + 1 }));
//   };

//   const toggleActive = () => {
//     setUser(prev => ({ ...prev, isActive: !prev.isActive }));
//   };

//   const resetUser = () => {
//     setUser({
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       age: 30,
//       isActive: true,
//     });
//   };

//   // Step 3: Handle form input
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type } = e.target;
    
//     setUser(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' 
//         ? (e.target as HTMLInputElement).checked 
//         : type === 'number' 
//           ? Number(value) 
//           : value,
//     }));
//   };

//   return (
//     <div>
//       <h2>User Profile</h2>
      
//       {/* Display current state */}
//       <div>
//         <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//         <p>Age: {user.age}</p>
//         <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
//       </div>

//       {/* Update buttons */}
//       <button onClick={updateName}>Change Name</button>
//       <button onClick={incrementAge}>Increase Age</button>
//       <button onClick={toggleActive}>
//         Toggle Status
//       </button>
//       <button onClick={resetUser}>Reset</button>

//       {/* Form for manual updates */}
//       <div>
//         <h3>Update User</h3>
//         <input
//           name="name"
//           value={user.name}
//           onChange={handleInputChange}
//           placeholder="Name"
//         />
//         <input
//           name="email"
//           type="email"
//           value={user.email}
//           onChange={handleInputChange}
//           placeholder="Email"
//         />
//         <input
//           name="age"
//           type="number"
//           value={user.age}
//           onChange={handleInputChange}
//           placeholder="Age"
//         />
//         <label>
//           <input
//             name="isActive"
//             type="checkbox"
//             checked={user.isActive}
//             onChange={handleInputChange}
//           />
//           Active
//         </label>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;