type UserInfoProps = {
    
    name: string;
    email: string;
    age?: number;  // optional
    city?: string;
    country?: string; // optional
}


export default function UserInfo({name, age, email, city, country}: UserInfoProps) {
    return (
        <div>
            {/* <h1>User information</h1> */}

            <h3> {name} </h3>
            <p> {age} </p>
            <p> {email} </p>
            <p> {city} </p>
            <p> {country} </p>

        </div>
    )
}