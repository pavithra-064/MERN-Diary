import { Form, Container } from "react-bootstrap";
import Navbar from "./navbar";
import { useEffect } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Cookies from "universal-cookie";
const ViewEntry = ({ title, date, description }) => {
  console.log("values");

  console.log(title);
  console.log(date);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const cookies = new Cookies();
  //   const saveEntry = () => {
  //     const currentdate = `${
  //       startDate.toString().split(" ")[0]
  //     }, ${startDate.toLocaleString("default", {
  //       month: "short",
  //     })} ${startDate.getDate()}, ${startDate.getFullYear()}`;
  //     var axios = require("axios");
  //     var qs = require("qs");
  //     if (title.length === 0) alert("Enter Title");
  //     else if (description.length === 0) alert("Enter Description");
  //     else {
  //       var data = qs.stringify({
  //         uuid: cookies.get("uid"),
  //         date: currentdate,
  //         title: title,
  //         content: description,
  //       });
  //       var config = {
  //         method: "post",
  //         url: "http://localhost:3000/api/memory/create",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         data: data,
  //       };

  //       axios(config)
  //         .then(function (response) {
  //           const json = response.data;
  //           if (json.message === "Data Saved Successfully") {
  //             alert("Saved Successfully");
  //           } else if (json.message === "Invalid User deatils.") {
  //             alert("Invalid User deatils.");
  //           } else if (json.message === "Invalid UID") {
  //             alert("Invalid UID");
  //           }
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     }
  //   };
  useEffect(() => {
    window.addEventListener("load", (event) => {
      alert("page is fully loaded");
    });
  });
  // const logout = () => {
  //   cookies.remove("uid", { path: "/" });
  // };

  return (
    <div id="newentry">
      <Navbar />
      <Container className="d-flex justify-content-center">
        <Form className=" text-wrap col-lg-9 col-md-9 col-sm-12 ">
          <Form.Group className="mb-0 mt-5 " controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder={title}
              className="pb-0 mb-0 entry entryform "
              style={{ height: "60px", fontSize: "20px" }}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-0" controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder={date}
              className="datepicker form-control entryform  "
              style={{ height: "60px", fontSize: "20px" }}
              readOnly
            />
            {/* <Form.Control
              type="password"
              placeholder="Password"
              className="p-0 m-0 entry "
              style={{ height: "60px" }}
            /> */}
          </Form.Group>
          <Form.Group
            className="mb-3  justify-content-center "
            controlId="formBasicEmail"
          >
            <Form.Control
              as="textarea"
              placeholder={description}
              className="entry resize-none entryform"
              style={{ height: "380px", fontSize: "20px" }}
              readOnly
            />
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default ViewEntry;
