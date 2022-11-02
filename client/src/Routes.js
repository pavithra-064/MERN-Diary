import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import AllEntries from "./components/allEntries";
import NewEntry from "./components/newEntry";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import ViewEntry from "./components/viewEntry";
// import Register from "./components/register/register";
// import Memory from "./components/diary/Newentry";
// import Entries from "./components/diary/Allentries";
// import Password from "./components/login/password";
// import Viewentry from "./components/diary/viewentry";
// import Search from "./search"
// import Forgotpassword from "./components/login/forgotpassword";
// import Image from "./components/image"
import { useState } from "react";
// import Cards from "./components/cards";

const App = () => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/entries"
          element={
            <AllEntries
              title={title}
              description={description}
              date={date}
              setTitle={setTitle}
              setDate={setDate}
              setDescription={setDescription}
            />
          }
        />
        <Route
          exact
          path="/viewentry"
          element={
            <ViewEntry title={title} description={description} date={date} />
          }
        />
        <Route exact path="/newentry" element={<NewEntry />} />
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPassword email={email} setEmail={setEmail} />}
        />
        <Route
          exact
          path="/resetpassword"
          element={<ResetPassword email={email} />}
        />

        {/* <Route exact path="/memory" element={<Memory/>}/>
      <Route exact path="/entries" element={<Entries/>}/>
      <Route exact path="/password" element={<Password email={email}/>}/>
      <Route exact path="/search" element={<Search/>}/> */}
        {/* <Route exact path="/viewentry" element={<Viewentry/>}/> */}
        {/* <Route exact path="/viewentry" element={<Viewentry/>} /> */}
        {/* render={(props) => <Viewentry date={date} {...props} /> } /> */}
        {/* <Route exact path="/forgotpassword" element={<Forgotpassword setEmail={setEmail} email={email} />} />
      <Route exact path="/image" element={<Image/>}/> */}
      </Routes>
    </Router>
  );
};
export default App;
