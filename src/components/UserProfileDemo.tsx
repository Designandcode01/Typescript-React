import { useState } from "react";

// ==================== INTERFACES ====================
interface User {
  name: string;
  age: number;
  email: string;
}

interface UserProfileProps {
  initialUser: User;  // This is a PROP - comes from parent
  title: string;      // Another PROP
}

// ==================== COMPONENT ====================
const UserProfileDemo = ({ initialUser, title }: UserProfileProps) => {
  // ========== STATE ==========
  // Internal data managed by this component
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // ========== EVENT HANDLERS (State Updates) ==========
  const handleAgeIncrement = () => {
    // Updating STATE (internal data)
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };
  
  const toggleEditMode = () => {
    // Updating STATE (internal UI state)
    setIsEditing(prev => !prev);
  };
  
  const resetToInitial = () => {
    // Using PROP value to reset STATE
    setUser(initialUser);
  };
  
  // ==================== RENDER ====================
  return (
    <div style={{ border: "2px solid #4CAF50", padding: "20px", margin: "20px", borderRadius: "10px" }}>
      {/* ========== PROPS DISPLAY ========== */}
      <h2 style={{ color: "#2196F3" }}>Props Received:</h2>
      <p><strong>Title (from props):</strong> &ldquo;{title}&rdquo;</p>
      <p><strong>Initial User (from props):</strong> {initialUser.name}, {initialUser.age}</p>
      
      <hr style={{ margin: "20px 0" }} />
      
      {/* ========== STATE DISPLAY ========== */}
      <h2 style={{ color: "#E91E63" }}>Current State:</h2>
      
      {isEditing ? (
        <div>
          <h3>Editing Mode (State: isEditing = true)</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <div>
          <h3>View Mode (State: isEditing = false)</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age} years old</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      
      {/* ========== STATE CONTROLS ========== */}
      <div style={{ marginTop: "20px" }}>
        <h3>State Controls:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={handleAgeIncrement} style={buttonStyle}>
            Increment Age (Updates State)
          </button>
          
          <button onClick={toggleEditMode} style={buttonStyle}>
            {isEditing ? "Exit Edit Mode" : "Enter Edit Mode"} (Toggles State)
          </button>
          
          <button onClick={resetToInitial} style={{...buttonStyle, backgroundColor: "#FF9800"}}>
            Reset to Initial Props
          </button>
        </div>
      </div>
      
      {/* ========== SUMMARY ========== */}
      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        <h3>💡 Key Distinctions:</h3>
        <ul>
          <li><strong>Props:</strong> <code style={{color: "#2196F3"}}>initialUser</code> and <code style={{color: "#2196F3"}}>title</code> - <em>Immutable</em>, passed from parent</li>
          <li><strong>State:</strong> <code style={{color: "#E91E63"}}>user</code> and <code style={{color: "#E91E63"}}>isEditing</code> - <em>Mutable</em>, managed internally</li>
          <li><strong>Props → State:</strong> We initialize <code>user</code> state with <code>initialUser</code> prop</li>
          <li><strong>Prop Immutability:</strong> Try to modify <code>initialUser</code> directly → TypeScript error!</li>
        </ul>
      </div>
    </div>
  );
};

// ==================== STYLES ====================
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default UserProfileDemo;