import React, { useState } from 'react';
// Define the type for your state object
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}


// const UserComponent = () => {
//     return (
//         <div>
//         </div>
//     )
// }

// export default UserComponent;


const UserComponent: React.FC = () => {
  // Initialize state with your object
  const [user, setUser] = useState<User>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    isActive: true,
  });
}
export default UserComponent;