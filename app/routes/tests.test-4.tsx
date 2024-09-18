import React, { useReducer } from "react";
export default function Page() {
  return (
    <>
      <h1 className={"text-xl font-bold mb-4"}>Test 4</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <UserForm />
      </div>
    </>
  );
}

// User types
interface User {
  name: string;
  surname: string;
  email: string;
}
// State types
interface State {
  form: User;
  users: User[];
}

// Action types
type Action =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "ADD_USER" }
  | { type: "RESET_FORM" };

// Reducer function to handle form updates and user list management
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, state.form],
      };
    case "RESET_FORM":
      return {
        ...state,
        form: { name: "", surname: "", email: "" },
      };
    default:
      return state;
  }
};

const UserForm = () => {
  // Reducer with form and users state
  const [state, dispatch] = useReducer(reducer, {
    form: { name: "", surname: "", email: "" },
    users: [],
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.form.name && state.form.surname && state.form.email) {
      dispatch({ type: "ADD_USER" });
      dispatch({ type: "RESET_FORM" });
    }
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          border: "solid 1px black",
          borderRadius: "4px",
          padding: 10,
          width: 300,
          margin: "auto",
        }}
        onSubmit={onSubmit}
      >
        <h3>
          <b>Add User</b>
        </h3>
        <input
          value={state.form.email}
          type="text"
          onChange={handleInputChange}
          style={{ margin: 5, paddingLeft: 5 }}
          placeholder="Email"
          name="email"
        />{" "}
        <input
          value={state.form.name}
          type="text"
          onChange={handleInputChange}
          style={{ margin: 5, paddingLeft: 5 }}
          placeholder="Name"
          name="name"
        />{" "}
        <input
          value={state.form.surname}
          type="text"
          onChange={handleInputChange}
          style={{ margin: 5, paddingLeft: 5 }}
          placeholder="Surname"
          name="surname"
        />
        <button
          style={{
            alignSelf: "center",
            padding: 5,
            marginTop: 5,
            border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          Submit
        </button>
      </form>
      <br />
      {state.users.length > 0 ? (
        <>
          <h4>List of users: </h4>
          {state.users.map((user, index) => (
            <div key={index} style={{ margin: 5, marginTop: 12 }}>
              <p>
                <b>Full Name: </b>
                {user.name} {user.surname}
              </p>
              <b>Email: </b>
              {user.email}
            </div>
          ))}
        </>
      ) : (
        "No Users"
      )}
    </div>
  );
};
