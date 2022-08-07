import { useState } from "react";
import { Form, Row, Container, Button } from "react-bootstrap";
import resetpass from "../assets/resetpass.png";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ email }) => {
  const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const changePass = () => {
    if ((password.length || confirmPassword.length || name.length) === 0) {
      alert("Enter All Fields");
    } else {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
      } else {
        var axios = require("axios");
        var qs = require("qs");
        var data = qs.stringify({
          email: email,
          otp: otp,
          password: password,
        });
        var config = {
          method: "post",
          url: "http://localhost:3000/api/setpassword",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            const json = response.data;
            if (json.message === "New password saved Successfully") {
              alert("New password saved Successfully");
              navigate("/");
            } else if (json.message === "The OTP you have entered is wrong") {
              alert("The OTP you have entered is wrong");
            } else alert("No details found!");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center resetPassword">
      <Form className="col-lg-8 text-wrap wrapper p-5">
        <Row>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <img
              src={resetpass}
              alt="register"
              height="auto"
              className="w-75 mt-4"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm 6">
            <h3>Password Reset</h3>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom1"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="floatingInputCustom"> Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingInputCustom2"
                type="email"
                placeholder={email}
                readOnly
                className="text-dark"
              />
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom3"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                id="floatingPasswordCustom4"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <label htmlFor="floatingPasswordCustom5">Confirm Passowrd</label>
            </Form.Floating>
            <Button
              onClick={changePass}
              style={{ backgroundColor: "#350106e5" }}
            >
              Reset
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

// export default ResetPassword;

// const ResetPassword = () => {
//   console.log("Email: ", email);
//   console.log("Email", typeof email);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [otp, setOtp] = useState("");

//  cc

//   return (

// );
//     <div>
//     { alert("inside passwprd")}
//     {
//         console.log(JSON.stringify(email))
//     }
// <div className="register">
//    <div className="wrapper">
//    <div className="leftt">
//        <img src={pic2} alt="diary1" className="img1" height="275" breadth="270"/>
//    </div>
//    <div className="main">
//        <h3>Password Reset</h3>
//        {/* <h5>If email not received, check your spam</h5> */}
//        <form className="form">
//        <div className="row1">
//                <input type="text"
//                 placeholder={email}
//                //  onChange={email}
//                 required
//                 readOnly></input>
//            </div>
//            <div className="row1">
//                <input
//                type="text"
//                placeholder="OTP"
//                onChange={(e) => {
//                    setOtp(e.target.value);
//                  }}
//                required>
//                </input>
//            </div>
//            <div className="row1">
//                <input type="password"
//                 placeholder="Password"
//                 onChange={(e) => {
//                  setPassword(e.target.value);
//                }}
//                 required></input>
//            </div>
//            <div className="row1">
//                <input
//                type="password"
//                placeholder="Confirm Password"

//                onChange={(e) => {
//                    setConfirmPassword(e.target.value);
//                  }}
//                required></input>
//            </div>
//            <div className="regbutton">
//            <button target="_blank"  onClick={(e) => {
//        e.preventDefault();
//        changePass();
//      }}>
//          Reset</button>
//            </div>

//        </form>

//    </div>

//    </div>

// </div>
// </div>
//};

export default ResetPassword;
