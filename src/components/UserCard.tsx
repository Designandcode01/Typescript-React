import UserInfo from "./UserInfo";

type UserCardProps = {
    name: string;
    email: string;
    age?: number;  // optional
    city?: string;
    country?: string;
   }

// export default function UserCard({name, age, email, city, country}: UserCardProps) {
//     return (
//         <div>
//             <h1>User Card</h1>
//             <UserInfo 
//                 name={name} 
//                 age={age} 
//                 email= {email} 
//                 city={city}
//                 country={country} 
//                     />
//         </div>
//     )
// }
/////////////Following is using speread operators////////////////////
export default function UserCard(props: UserCardProps) {
    return (
        <div>
            <h1>User Card</h1>
            <UserInfo {...props} />
        </div>
    )
}