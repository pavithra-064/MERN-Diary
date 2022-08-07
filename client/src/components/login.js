import React from "react";
import diary from "../assets/diary.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [wrongpass, setWrongpass] = useState(false);
  const [password, setPassword] = useState("");
  const [allData, setAllData] = useState([]);
  const [message, setMessage] = useState("");
  // const [loginData, setLoginData] = useState(allData);

  const cookies = new Cookies();

  const navigate = useNavigate();

  const login = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      setMessage("Enter valid email ID");
      // this.setState({
      //     error: "Email is not valid"
      // });
    } else {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        email: email,
        password: password,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/api/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const json = response.data;
          // console.log(json.message);
          setAllData(response.data);
          //   setLoginData(response.data);
          console.log("json uid :", json.uid);
          cookies.set("uid", json.uid, { path: "/" });
          // setCookie('uid',json.uid, { path: '/' });
          if (json.message === "Login Successful") {
            setWrongpass(true);
            navigate("/entries");
            console.log(cookies.uid);
            console.log(cookies.get("uid"));
          } else if (json.message === "Invalid Password")
            setMessage("Invalid Password!");
          else setMessage("User not Found");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Container className="d-flex login justify-content-center col-lg-9   ">
      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Floating className="mt-3 mb-3" placeholder="Enter Addresss">
                <Form.Control type="email" placeholder="Enter email" />

                <label htmlFor="floatingPasswordCustom">Password</label>
              </Form.Floating>
            </Form.Group> */}

      <Form className=" text-wrap wrapper px-5 py-5 col-lg-10 shadow-lg">
        <Row>
          <div className="col-lg-6 col-md-6 col-sm-6 text-wrap">
            {/* <div></div> */}
            <img src={diary} alt="diary" height="auto" className="w-100 mt-3" />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6">
            <h3>Diary Login</h3>

            <Form.Floating className="mt-3 mb-3" placeholder="Enter Addresss">
              <Form.Control
                type="email"
                placeholder="Enter Emails"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingEmailCustom">Email ID</label>
              {/* <Form.label htmlFor="floatingInputCustom">
                Email address
              </Form.label> */}
            </Form.Floating>

            <Form.Floating>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="z-index-3"
              />
              <label htmlFor="floatingPasswordCustom">Password</label>
            </Form.Floating>
            {/* <Row>
              {!wrongpass && <span className="message">{message}</span>}
            </Row> */}
            <Row>
              <Row className="col-lg-12 ms-5">
                {!wrongpass && (
                  <span className="message col-lg-5 ms-1">{message}</span>
                )}
                <Col className="col-lg-6">
                  <Button
                    className="bg-transparent border-0 ms-4  text-underline forgotpassword"
                    onClick={(e) => {
                      navigate("/forgotpassword");
                    }}
                    style={{ color: "#350106e5", fontSize: "12px" }}
                  >
                    Forgot Password
                  </Button>
                </Col>
              </Row>

              <Col>
                <Button
                  className=" loginbtn "
                  onClick={(e) => {
                    login();
                    //navigate("/entries");
                  }}
                >
                  Login
                </Button>
              </Col>
            </Row>
            <Button
              className="bg-transparent border-0 pt-2"
              onClick={(e) => {
                e.preventDefault();

                navigate("/register");
              }}
              style={{ color: "#350106e5" }}
            >
              Dont have an account? <Link to="/register">Sign up</Link>
            </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
}
export default Login;

// <Container>
//   <Form className="form p-5 wrapper mt-4 text-wrap m-4  ">
//     <Row>
//       <div className="container col-lg-4 col-md-6 col-sm-6 text-wrap">
//         {/* <div className="col-lg- col-md-6 col-sm-6 col-xs-6 mt-4"> */}
//         <img
//           src={diary}
//           alt="contact-us"
//           className="img-fluid contactimg "
//         />{" "}
//       </div>
//       <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6  contact-form">
//         <h3>Diary Login</h3>

//         <Form.Floating className="mt-3 mb-3">
//           <Form.Control
//             id="floatingInputCustom"
//             type="email"
//             placeholder="name@example.com"
//           />
//           <label htmlFor="floatingInputCustom">Email address</label>
//         </Form.Floating>
//         <Form.Floating>
//           <Form.Control
//             id="floatingPasswordCustom"
//             type="password"
//             placeholder="Password"
//           />
//           <label htmlFor="floatingPasswordCustom">Password</label>
//         </Form.Floating>

//         <Row>
//           <Col>
//             <Button
//               className="mt-3 loginbtn"
//               onClick={(e) => {
//                 navigate("/login");
//               }}
//             >
//               Login
//             </Button>
//           </Col>
//           <Col>
//             <Button
//               className="bg-transparent border-0"
//               onClick={(e) => {
//                 navigate("/forgotpassword");
//               }}
//             >
//               Forgot Password
//             </Button>
//           </Col>
//         </Row>
//         <Button
//           className="bg-transparent border-0"
//           onClick={(e) => {
//             e.preventDefault();
//             //  login();
//             navigate("/register");
//           }}
//         >
//           New User: Register
//         </Button>
//       </div>
//     </Row>
//   </Form>
// </Container>
