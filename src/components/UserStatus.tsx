// UserStatus.tsx
import { useState } from 'react';

type UserStatusProps = {
  initialOnline?: boolean; // Make it optional with default
  showToggle?: boolean;
}

        const UserStatus = ({ 
        initialOnline = true, 
        showToggle = true 
        }: UserStatusProps) => {
            
        const [isOnline, setIsOnline] = useState<boolean>(initialOnline);

        const toggleStatus = () => {
            setIsOnline(prev => !prev);
        };

  return (
    <div className="user-status">
      <h3>User Status</h3>
      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>
      
      {showToggle && (
        <button onClick={toggleStatus} className="toggle-btn">
          Toggle Status
        </button>
      )}
      
      <p>Current status: {isOnline ? 'Online' : 'Offline'}</p>
    </div>
  );
}

export default UserStatus;













// type UserStatusProps = {
//     online: boolean;
// }

// const UserStatus = ({online}: UserStatusProps) => {
//   return (
//     <>
//     <div>UserStatus</div>

//     {
//         online ? "Online" : "Offline"
//     }

//     </>
//   )
// }

// export default UserStatus