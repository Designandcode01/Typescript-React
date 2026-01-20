type ConditionalsProps = {
    name: string;
    isOnline: boolean;
    hideOffline: boolean;
    isPremium: true;
    isNewMember: true;
}

export default function Conditionals({name, isOnline, hideOffline, isPremium, isNewMember}: ConditionalsProps) {

    if (hideOffline && !isOnline) {
            return null;
         }

        return (
            <div>
                <h3> {name} </h3>
                {isPremium && <span>✨</span>}
                {isNewMember && <span>👍</span>}
                
                <span> {isOnline ? "✔Online" : "Offline" } </span>
                <p> {isOnline ? "Available for Chat" : "Not Available" } </p>
                { isOnline ? (
                    <button>Send Message</button>
                ) : "Check back later" }
            </div>
            )
        }




    // if (hideOffline && !isOnline) {
    //             return null;
    //         }

//     return (
        
//         <div>
//             {isOnline ? (
//                 <div>
//                     <h3> {name} </h3>
//                     <span>✔ Online</span>
//                     <p>Available for Chat</p>
//                     <button>Send Message</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h3> {name} </h3>
//                     <span> Offline</span>
//                     <p>Not Available for Chat</p>
//                     <button>Check later</button>
//                 </div>
//             )}
//         </div>
//     )
// }

///////////////////////////////////////////////////////////////////////////////////////////////


// type ConditionalsProps = {
//     name: string;
//     isOnline: boolean;
// }

// export default function Conditionals({name, isOnline}: ConditionalsProps) {
    
//     if (isOnline) {
//         return (
//             <div>
//                 <h3> {name} </h3>
//                 <span>✔ Online</span>
//                 <p>Available for Chat</p>
//                 <button>Send Message</button>
//             </div>
//         );
//     }
    
//     return (
//         <div>
//             <h3> {name} </h3>
//             <span> Offline</span>
//             <p>Not Available for Chat</p>
//             <button>Check later</button>
//         </div>
//     );
    
// }


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// type ConditionalsProps = {
//     name: string;
//     isOnline: boolean;
// }

// export default function Conditionals({name, isOnline}: ConditionalsProps) {
//     return (
//         <div>
//             <h3>{name}</h3>
//             {isOnline ? (
//                 <>
//                     <span>✔ Online</span>
//                     <p>Available for Chat</p>
//                     <button>Send Message</button>
//                 </>
//             ) : (
//                 <>
//                     <span>Offline</span>
//                     <p>Not Available for Chat</p>
//                     <button>Check later</button>
//                 </>
//             )}
//         </div>
//     );
// }



