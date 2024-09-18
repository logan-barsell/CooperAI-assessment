import React, { createContext, useContext, useEffect, useState } from "react";

// Define types
interface Users {
  [name: string]: boolean;
}

interface UsersContextType {
  users: Users;
  randomizeUsers: () => void;
}

// Create the context
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Custom hook to use the UsersContext
const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};

interface UsersProviderProps {
  children: React.ReactNode;
}
// UsersProvider component to wrap the context around the app
const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<Users>({
    Nicolas: true,
    Mary: true,
    Julia: true,
    John: true,
    Jorge: true,
  });

  const randomizeOneUser = (users: Users) => {
    const names = Object.keys(users);
    const random = Math.floor(Math.random() * names.length);
    const newUsers = { ...users };
    newUsers[names[random]] = !users[names[random]];
    return newUsers;
  };

  const randomizeUsers = () => {
    setUsers(randomizeOneUser);
  };

  useEffect(() => {
    const interval = setTimeout(randomizeUsers, 5000);
    return () => clearTimeout(interval); // Ensure cleanup
  }, [users]);

  return (
    <UsersContext.Provider value={{ users, randomizeUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

// Page component that uses the UsersProvider to provide context
export default function Page() {
  return (
    <UsersProvider>
      <h1 className="text-xl font-bold mb-4">Test 5</h1>
      <UserList />
      <UserStatus />
      <ActionButton />
    </UsersProvider>
  );
}

// UserList component that now uses context instead of props
const UserList: React.FC = () => {
  const { users } = useUsersContext();
  return (
    <div style={{ padding: 20 }}>
      {Object.keys(users).map((key) => (
        <User key={key} name={key} status={users[key]} />
      ))}
    </div>
  );
};

// User component that uses context instead of props
const User: React.FC<{ name: string; status: boolean }> = ({
  name,
  status,
}) => {
  const { users } = useUsersContext();
  const allAlone =
    status &&
    Object.keys(users)
      .filter((userName) => userName !== name)
      .map((userName) => users[userName])
      .filter((online) => online).length === 0;

  return (
    <p>
      {`${name}: `}
      {status ? (
        <span style={{ color: "green", fontWeight: "bolder" }}>ONLINE</span>
      ) : (
        <span style={{ color: "red", fontWeight: "bolder" }}>OFFLINE</span>
      )}
      {allAlone && " and I'm all alone..."}
    </p>
  );
};

// UserStatus component that consumes context
const UserStatus: React.FC = () => {
  const { users } = useUsersContext();
  const onlineUsers = Object.keys(users)
    .map((name) => users[name])
    .filter((online) => online).length;

  return (
    <p>
      There are currently <b>{onlineUsers}</b> users online
    </p>
  );
};

// ActionButton component that consumes the context to trigger the action
const ActionButton: React.FC = () => {
  const { randomizeUsers } = useUsersContext();
  return (
    <button
      style={{
        padding: 5,
        marginTop: 5,
        border: "1px solid black",
        borderRadius: "4px",
        width: "fit-content",
      }}
      type="button"
      onClick={randomizeUsers}
    >
      Randomize now!
    </button>
  );
};
