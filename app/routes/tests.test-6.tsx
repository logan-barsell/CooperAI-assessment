export default function Page() {
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 6 - Optional</h1>
      <Application />
    </>
  );
}

const currentUser = {
  name: "Michael",
};

interface User {
  [key: string]: string;
}

interface BadgeProps {
  user: User;
  salutation: string;
}

// Higher-Order Component (HOC) to inject the user prop
const withUser =
  (user: User) => (Component: React.ComponentType<BadgeProps>) => {
    return (props: Omit<BadgeProps, "user">) => {
      return <Component {...props} user={user} />;
    };
  };

const Badge = ({ user, salutation }: BadgeProps) => {
  return (
    <main
      style={{
        border: "solid 1px blue",
        borderRadius: "20px",
        textAlign: "center",
      }}
    >
      <header>
        <h1>{salutation}</h1>
        <p>My Name Is</p>
      </header>
      <div>
        <p style={{ fontSize: "32pt", fontWeight: "bold" }}>{user.name}</p>
      </div>
    </main>
  );
};

const BadgeWithUser = withUser(currentUser)(Badge);
const Application = () => <BadgeWithUser salutation="Good day" />;
