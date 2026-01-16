type UserProfileProps = {
    name: string;
    age: number;
    
}




export default function UserProfile(props: UserProfileProps) {

    return (
        <>
        <h1> {props.name} </h1>
        <p> {props.age} </p>
        </>
    )
}