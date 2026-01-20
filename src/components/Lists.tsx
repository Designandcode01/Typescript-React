

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    email: "alice@example.com",
    isActive: true
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 35,
    email: "bob@example.com",
    isActive: false
  },
  {
    id: 3,
    name: "Charlie Brown",
    age: 42,
    email: "charlie@example.com",
    isActive: true
  }
];

type ListsProps = {
    id: number;
    name: string;
    age: number;
    email: string;
    isActive: boolean;
}



export default function Lists({id, name, age, email, isActive}: ListsProps) {
    return (
        <>
            <h1>Lists </h1>

            <ul>
                {
                    users.map((user) => (
                        <li key={user.id}>
                            {id}
                            {name}
                            {age}
                            {email}
                            {isActive}
                        </li>
                    ))
                }
            </ul>

        </>
    )
}