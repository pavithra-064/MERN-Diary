// import { Container } from "react-bootstrap";
import reg from "../assets/reg.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allData, setAllData] = useState([]);
  const [message, setMessage] = useState("");
  const [wrongpass, setWrongpass] = useState(false);
  const [loginData, setLoginData] = useState(allData);

  const submitReg = () => {
    if (
      (password.length ||
        confirmPassword.length ||
        email.length ||
        name.length) === 0
    ) {
      setMessage("Enter All Details");
    } else {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!email || regex.test(email) === false) {
        setMessage("Enter valid email ID");
      } else {
        if (password !== confirmPassword) {
          setMessage("Password didn't match");
        } else {
          setWrongpass(true);
          var axios = require("axios");
          var qs = require("qs");
          var data = qs.stringify({
            name: name,
            email: email,
            password: password,
          });
          var config = {
            method: "post",
            url: "http://localhost:3000/api/register",
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
              setLoginData(response.data);
              if (json.message === "User Created Successfully") {
                alert("User Created Successfully");
                navigate("/");
              } else alert("User Already exists!");
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  };
  return (
    <Container className="d-flex register justify-content-center ">
      {/* <Container> */}
      <Form className="p-5 text-wrap wrapper col-lg-8">
        <Row>
          <div className="col-lg-6 col-md-6 col-sm-6 mt-5">
            <img src={reg} alt="diary" height="80%" className="w-100" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <h3>Diary-Register</h3>
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
                placeholder="name@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="floatingInputCustom">Email address</label>
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
            {!wrongpass && <span className="message">{message}</span>}
            <Row className="col-lg-3 ps-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  submitReg();
                }}
                style={{ backgroundColor: "#350106e5" }}
              >
                Register
              </Button>
            </Row>
            <Row>
              <Col>
                <Button
                  className="bg-transparent border-0 pt-3"
                  onClick={(e) => {
                    e.preventDefault();

                    navigate("/");
                  }}
                  style={{ color: "#350106e5" }}
                >
                  Already have an account? <Link to="/">Log in</Link>
                </Button>
                {/* <Button
                  onClick={(e) => {
                    navigate("/");
                  }}
                >
                  Login
                </Button> */}
              </Col>
            </Row>
          </div>
        </Row>
      </Form>
      {/* </Container> */}

      {/* <div className="register">
          <div className="wrapper">
            <div className="leftt">
              <img
                src={pic1}
                alt="diary1"
                className="img1"
                height="275"
                breadth="270"
              />
            </div>
            <div className="main">
              <h3>Diary - Register </h3>
              <form className="form">
                <div className="row1">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className="row1">
                  <input
                    type="text"
                    placeholder="Email Id"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className="row1">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className="row1">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    required
                  ></input>
                </div>
                <div className="regbutton">
                  <button
                    target="_blank"
                    onClick={(e) => {
                      e.preventDefault();
                      submitReg();
                    }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
    </Container>
    // </div>
  );
};

export default Register;
