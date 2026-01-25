import { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
}

export const ToDoList = () => {
  const [items, setItems] = useState<TodoItem[]>([
    { id: 1, text: "Learn TypeScript" },
    { id: 2, text: "Build another App" }
  ]);
  const [newTask, setNewTask] = useState("");

  const addItem = () => {
    if (!newTask.trim()) return;
    
    const newItem: TodoItem = {
      id: Date.now(),
      text: newTask
    };
    setItems([...items, newItem]);
    setNewTask("");
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem} disabled={!newTask.trim()}>
          Add Item
        </button>
      </div>
      
      {items.length === 0 ? (
        <p className="empty-message">No items yet. Add your first task!</p>
      ) : (
        <ul className="todo-list">
          {items.map((item) => (
            <li key={item.id} className="todo-item">
              <span className="todo-id">#{item.id}</span>
              <span className="todo-text">{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};










// import { useState } from "react";

// interface TodoItem {
//   id: number;
//   text: string;
// }

// export const ToDoList = () => {
//   const [items, setItems] = useState<TodoItem[]>([
//     { id: 1, text: "Learn TypeScript" },
//     { id: 2, text: "Build another App" }
//   ]);

//   // For debugging - consider removing in production
//   console.log("Rendering with Items:", items);

//   const addItem = () => {
//     const newItem: TodoItem = {
//       id: Date.now(),
//       text: "Deployment to production"
//     };
//     setItems([...items, newItem]);
//   }

//   return (
//     <>
//     <div className="todo-container">
//       <h1 className="todo-title">To-Do List</h1>
      
//       {items.length === 0 ? (
//         <p className="empty-message">No items yet. Add your first task!</p>
//       ) : (
//         <ul className="todo-list">
//           {items.map((item) => (
//             <li key={item.id} className="todo-item">
//               <span className="todo-id">#{item.id}</span>
//               <span className="todo-text">{item.text}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={addItem}>Add Item</button>

//     </div>
//     </>
//   );
// };











// // import { useState } from "react"

// // export const ToDoList = () => {

// //              const [items, setItems] = useState([
// //                     {id: 1, text: "Learn Typescript"},
// //                     {id: 2, text: "Build another App"}
// //                 ]);


// //     console.log("Rendering with Items: ", items)
// //     return (
// //         <div>
// //             <h1>To Do List</h1>
// //             <ul>
// //                 {items.map((item) => (
// //                     <li key={item.id}> 
// //                     {item.id}
// //                     {item.text}
// //                      </li>
// //                 ))}
// //             </ul>

// //         </div>
// //     )
// // }