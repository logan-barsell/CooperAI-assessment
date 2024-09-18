import { useState, useEffect } from "react";

const USERS_COUNT = 10;
const URL = `https://randomuser.me/api?results=${USERS_COUNT}`;
interface User {
  name: {
    first: string;
    last: string;
  };
  phone: string;
  email: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    medium: string;
  };
}
// Function to fetch users from API endpoint
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.results;
};

export default function Page() {
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 2</h1>
      <UsersList />
    </>
  );
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users when the component renders
  useEffect(() => {
    (async () => {
      const res = await fetchUsers(); // API call
      setUsers(res); // Set users state
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      {users.map((user, index) => {
        return <UserCard user={user} id={index} />;
      })}
    </div>
  );
};

interface UserProps {
  user: User;
  id: number;
}

const UserCard = ({ user, id }: UserProps) => {
  return (
    <div
      key={id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "350px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        style={{
          borderRadius: "50%",
          marginBottom: "15px",
        }}
        src={user.picture.medium}
        alt={`${user.name.first}`}
      />
      <div style={{ textAlign: "center" }}>
        <h3>
          <b>
            {user.name.first} {user.name.last}
          </b>
        </h3>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Phone:</b> {user.phone}
        </p>
        <p>
          <b>Location:</b> {user.location.city}, {user.location.country}
        </p>
      </div>
    </div>
  );
};
