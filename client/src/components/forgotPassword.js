import React from "react";
// import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
// import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
//import Password from "./password";

const ForgotPassword = (props) => {
  console.log(props);
  //const [email, setEmail] = useState("");
  const setEmail = props.setEmail;
  const email = props.email;

  // const [isSubmitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const getotp = (e) => {
    // navigate("/resetpassword");
    e.preventDefault();
    console.log("Emasl", email);
    // setSubmitted(true);
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      email: email,
    });
    var config = {
      method: "post",
      url: "http://localhost:3000/api/getotp",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const json = response.data;
        if (json.message === "Mail sent successfully") {
          alert("Mail sent successfully");

          console.log("setEmsil", setEmail);
          console.log(email);
          // return <Passwordd email={email} />
          navigate("/resetpassword");
        } else if (json.message === "Mail not sent. Try again after sometime.")
          alert("Mail not sent. Try again after sometime.");
        else alert("No user found with the given email.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container className="wrapper d-flex login justify-content-center col-lg-6 col-md-8 col-sm-6 forgotpassword">
      <Form onSubmit={getotp} className="col-lg-10 p-4 ">
        <h3>Password Reset</h3>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Text className="text-muted fs-5">
            Enter the email address to reset your password.
          </Form.Text>
          {/* <input
            type="text"
            placeholder="Email ID"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></input> */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="my-3"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#350106e5" }}
        >
          Send OTP
        </Button>
      </Form>
    </Container>

    // <div>
    //   <div>
    //     <div className="wrapper wrapper1">
    //       <div className="main1 ">
    //         <h3>Password Reset</h3>
    //         <form className="form1" onSubmit={getotp} method="post">
    //           <h3>Enter the email address to reset your password.</h3>
    //           <div className="row2">
    //             <input
    //               type="text"
    //               placeholder="Email ID"
    //               onChange={(e) => {
    //                 setEmail(e.target.value);
    //               }}
    //               required
    //             ></input>
    //           </div>
    //           <div className="regbutton">
    //             <button target="_blank" type="submit">
    //               Reset
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //   {/* {isSubmitted && <Password email={email}/>}                                */}
    // </div>
  );
};

export default ForgotPassword;
