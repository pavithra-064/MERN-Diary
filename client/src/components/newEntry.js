import { FloatingLabel, Form, Button, Container, Row } from "react-bootstrap";
import Navbar from "./navbar";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "universal-cookie";
const NewEntry = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const [message, setMessage] = useState("");
  // const [wrongdetails, setWrongdetails] = useState(false);
  const cookies = new Cookies();
  const saveEntry = () => {
    const currentdate = `${
      startDate.toString().split(" ")[0]
    }, ${startDate.toLocaleString("default", {
      month: "short",
    })} ${startDate.getDate()}, ${startDate.getFullYear()}`;
    var axios = require("axios");
    var qs = require("qs");
    if (title.length === 0) alert("Enter Title");
    else if (description.length === 0) alert("Enter Description");
    else {
      var data = qs.stringify({
        uuid: cookies.get("uid"),
        date: currentdate,
        title: title,
        content: description,
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/api/memory/create",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const json = response.data;
          if (json.message === "Data Saved Successfully") {
            alert("Saved Successfully");
            // setWrongdetails(true);
          } else if (json.message === "Invalid User deatils.") {
            alert("Invalid User deatils.");
          } else if (json.message === "Invalid UID") {
            alert("Invalid UID");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logout = () => {
    cookies.remove("uid", { path: "/" });
  };

  return (
    <div id="newentry">
      <Navbar />
      <Container className="d-flex justify-content-center">
        <Form className=" text-wrap col-lg-9 col-md-9 col-sm-12 ">
          <Form.Group className="mb-0 mt-5 " controlId="formBasicEmail">
            {/* {!wrongdetails && <span className="text-light">{message}</span>} */}
            <Button
              className="save-new-entry bg-transparent border-0 text-primary"
              onClick={saveEntry}
            >
              Save Now
            </Button>
            <Form.Control
              type="text"
              placeholder="Entry Title"
              className="pb-0 mb-0 entry entryform "
              onChange={(e) => setTitle(e.target.value)}
              style={{ height: "60px", fontSize: "23px" }}
            />
          </Form.Group>
          <div className="form-control entryform">
            <DatePicker
              selected={startDate}
              className="date-picker d-flex"
              onChange={(date) => setStartDate(date)}
            />
          </div>
          {/* <Form.Group className="mb-0" controlId="formBasicPassword">
            <DatePicker
              selected={startDate}
              className="datepicker form-control entryform  "
              onChange={(date) => setStartDate(date)}
              style={{ height: "60px" }}
            /> */}
          {/* <Form.Control
              type="password"
              placeholder="Password"
              className="p-0 m-0 entry "
              style={{ height: "60px" }}
            /> */}
          {/* </Form.Group> */}
          <Form.Group
            className="mb-3  justify-content-center "
            controlId="formBasicEmail"
          >
            <Form.Control
              as="textarea"
              placeholder="        Hello there, You can start writing down your thoughts here!"
              className="entry resize-none entryform"
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "380px", fontSize: "21px" }}
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default NewEntry;
