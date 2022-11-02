import Navbar from "./navbar";
import { Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ShowMoreText from "react-show-more-text";
import Cards from "./cards";
import Cookies from "universal-cookie";
import moment from "moment";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
const AllEntries = (props) => {
  const setTitle = props.setTitle;
  const setDate = props.setDate;
  const setDescription = props.setDescription;

  //console.log(props);

  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [sortedData, setSortedData] = useState(allData);
  // const[filteredData,setFilteredData]=useState(sortedData);
  const cookies = new Cookies();
  const [startDate, setStartDate] = useState(new Date());
  // window.addEventListener("popstate", (event) => {
  //   event.preventDefault();
  //   if (window.confirm("Do you wish to log out")) {
  //     cookies.remove("uid", { path: "/" });
  //     navigate("/");
  //   } else {
  //     // Do nothing!
  //     console.log("Thing was not saved to the database.");
  //   }
  // });
  // useEffect(() => {
  //   window.addEventListener("popstate", (event) => {
  //     event.preventDefault();
  //     if (window.confirm("Do you wish to log out")) {
  //       cookies.remove("uid", { path: "/" });
  //       navigate("/");
  //     } else {
  //       // Do nothing!
  //       navigate("/entries");
  //     }
  //   });
  //   // cleanup this component
  //   return () => {
  //     window.removeEventListener("popstate");
  //   };
  // }, []);
  useEffect(() => {
    if (cookies.get("uid") === undefined) {
      navigate("/");
    } else {
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        uuid: cookies.get("uid"),
      });
      var config = {
        method: "post",
        url: "http://localhost:3000/api/homepage",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setUseremail(response.data.user.email);
          console.log(useremail);
          setUsername(response.data.user.name);
          if (
            response.data.memories === undefined ||
            response.data.memories.length === 0
          )
            alert("No Entries to display");
          else {
            setAllData(response.data.memories);
            // date = moment(new Date("Wed, Feb 27, 2019")).format("DD-MMM-YYYY");
            allData.sort(function (a, b) {
              var c = new Date(a.date);
              var d = new Date(b.date);
              return d - c;
            });
            setSortedData(allData);
            setCount(1);
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    }
  }, [count]);

  const handleSearch = (event) => {
    // console.log(event);
    // date=(moment(new Date(event)).format('DD-MMM-YYYY'));

    const currentdate = `${
      event.toString().split(" ")[0]
    }, ${event.toLocaleString("default", {
      month: "short",
    })} ${event.getDate()}, ${event.getFullYear()}`;
    console.log(currentdate);
    let result = [];
    result = allData.filter((item) => {
      return item.date.search(currentdate) !== -1;
    });
    if (result.length === -0) alert("No entries on this date");
    else {
      console.log(result);
      setSortedData(result);
      console.log(sortedData);
    }
  };
  // const logout = () => {
  //   cookies.remove("uid", { path: "/" });
  // };
  return (
    <div>
      <Navbar />
      <Container fluid className="col-lg-12 col-md-12 col-sm-12 journal py-4">
        <h3>{username}'s Journal</h3>
        <Container className="col-lg-6 pt-4">
          <Row>
            <div className="col-lg-8 col-md-6 col-sm-4">
              <Row>
                <div className="col-lg-5">
                  <h5>Search by Date:</h5>
                </div>
                <div className="col-lg-4">
                  <DatePicker
                    selected={startDate}
                    className="datepicker form-control entry "
                    style={{ height: "60px" }}
                    onChange={(date) => {
                      setStartDate(date);
                      handleSearch(date);
                    }}
                  />
                </div>
              </Row>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-4">
              <Button
                onClick={() => {
                  navigate("/newentry");
                }}
                className="newentrybtn"
              >
                (+)New Entry
              </Button>
            </div>
          </Row>
        </Container>
      </Container>
      <Container className="border border-2 border-white p-5 mt-5 col-lg-8">
        {sortedData.map((item) => (
          <Cards
            setTitle={setTitle}
            setDate={setDate}
            setDescription={setDescription}
            // key={item.id}
            date={moment(new Date(item.date)).format("DD-MMM-YYYY")}
            title={item.title}
            description={item.content}
          ></Cards>
        ))}
        {/* <Card className="m-3">
          <Card.Body>This is some text within a card body.</Card.Body>
        </Card> */}
      </Container>
    </div>
  );
};

// const Cards = (props) => {
//   const cookies = new Cookies();
//   const navigate = useNavigate();
//   const setTitle = props.setTitle;
//   const title = props.title;
//   const setDate = props.setDate;
//   const date = props.date;
//   const setDescription = props.setDescription;
//   const description = props.description;

//   const view = (props) => {
//     console.log(props);

//     console.log("CHEHCK", setTitle, title, setDate, date);
//     navigate("/viewentry");
//   };
//   return (
//     <div className="card mb-5">
//       <Card className="Card">
//         <Card.Body>
//           <Row>
//             <div className="col-lg-2">
//               <Card.Text className="mt-3">{props.date}</Card.Text>
//             </div>
//             <div className="col-lg-8">
//               <Card.Title>{props.title}</Card.Title>

//               <Card.Text>
//                 <ShowMoreText
//                   /* Default options */
//                   lines={3}
//                   more="Show more"
//                   less="Show less"
//                   className="content-css"
//                   anchorClass="my-anchor-css-class"
//                   onClick={() => {
//                     setTitle(props.title);
//                     view(props);
//                   }}
//                   // cookies.set("title", props.title, { path: "/" });
//                   // cookies.set("content", props.description, { path: "/" });
//                   // console.log("Cookies", cookies.get("date"));
//                   // console.log("Cookies title", cookies.get("title"));
//                   // console.log(props.date);
//                   // console.log(props.title);
//                   // navigate("/viewentry");
//                   expanded={false}
//                   width={450}
//                   truncatedEndingComponent={"... "}
//                 >
//                   {props.description}
//                 </ShowMoreText>
//               </Card.Text>
//             </div>
//           </Row>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

export default AllEntries;

//   let date;
//   const [count, setCount] = useState(0);
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(false);
//   const [allData, setAllData] = useState([]);
//   const [username, setUsername] = useState("");
//   const [useremail, setUseremail] = useState("");
//   const [sortedData, setSortedData] = useState(allData);
//   // const[filteredData,setFilteredData]=useState(sortedData);
//   const cookies = new Cookies();
//   const [startDate, setStartDate] = useState(new Date());
//   // constructor(props, context) {
//   //     super(props, context);
//   //     this.state = {
//   //         visible: false,
//   //         allData:[]
//   //       };
//   // }

//   useEffect(() => {
//     window.addEventListener("popstate", (event) => {
//       event.preventDefault();
//       if (window.confirm("Do you wish to log out")) {
//         cookies.remove("uid", { path: "/" });
//         navigate("/");
//       } else {
//         // Do nothing!
//         console.log("Thing was not saved to the database.");
//       }
//     });
//     console.log("inside useffect");
//     if (cookies.get("uid") === undefined) {
//       navigate("/");
//     } else {
//       var axios = require("axios");
//       var qs = require("qs");
//       var data = qs.stringify({
//         uuid: cookies.get("uid"),
//       });
//       var config = {
//         method: "post",
//         url: "http://localhost:3000/api/homepage",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         data: data,
//       };

//       axios(config)
//         .then(function (response) {
//           setUseremail(response.data.user.email);
//           setUsername(response.data.user.name);
//           if (
//             response.data.memories === undefined ||
//             response.data.memories.length === 0
//           )
//             alert("No Entries to display");
//           else {
//             setAllData(response.data.memories);
//             date = moment(new Date("Wed, Feb 27, 2019")).format("DD-MMM-YYYY");
//             allData.sort(function (a, b) {
//               var c = new Date(a.date);
//               var d = new Date(b.date);
//               return d - c;
//             });
//             setSortedData(allData);
//             setCount(1);
//           }
//         })

//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   }, [count]);

//   const handleSearch = (event) => {
//     // console.log(event);
//     // date=(moment(new Date(event)).format('DD-MMM-YYYY'));

//     const currentdate = `${
//       event.toString().split(" ")[0]
//     }, ${event.toLocaleString("default", {
//       month: "short",
//     })} ${event.getDate()}, ${event.getFullYear()}`;
//     console.log(currentdate);
//     let result = [];
//     result = allData.filter((item) => {
//       return item.date.search(currentdate) !== -1;
//     });
//     if (result.length == -0) alert("No entries on this date");
//     else {
//       console.log(result);
//       setSortedData(result);
//       console.log(sortedData);
//     }
//   };
//   const logout = () => {
//     cookies.remove("uid", { path: "/" });
//   };

//   return (
//     <div className="entries">
//       <div>
//         <div id="slide__nav">
//           <h2>Personal Diary</h2>

//           <p id="slide__nav__button" onClick={() => setVisible(!visible)}>
//             ☰
//           </p>
//         </div>
//         <div className="entryul">
//           <ul id="slide__menu" style={{ display: visible ? "block" : "none" }}>
//             <img
//               src={pic2}
//               alt="diary"
//               height="200"
//               width="280"
//               className="diaryimg"
//             />
//             {/* <div className="details">
//                 <h3>User:{username}</h3>
//                 <h3>Email:{useremail}</h3>
//                 </div> */}
//             <li>
//               <a href="/memory">New Entry</a>
//             </li>
//             <li>
//               <a href="/image">View All Entries</a>
//             </li>
//             <li>
//               <a href="/" onClick={logout}>
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="journal">
//         <div className="journal1">
//           <h3>{username}'s Journal</h3>
//         </div>
//         <div className="journal2">
//           <button
//             onClick={() => {
//               navigate("/memory");
//             }}
//           >
//             (+)New Entry
//           </button>
//           <h4>Search by Date:</h4>
//           <DatePicker
//             selected={startDate}
//             className="datepicker1 react-datepicker-wrapper1"
//             onChange={(date) => {
//               setStartDate(date);
//               handleSearch(date);
//             }}
//           />
//         </div>
//       </div>
//       <div className="rectangle">
//         <div className="wrapp">
//           {sortedData.map((item) => (
//             <Cards
//               // key={item.id}
//               date={moment(new Date(item.date)).format("DD-MMM-YYYY")}
//               title={item.title}
//               description={item.content}
//             ></Cards>
//           ))}
//           {/*
//      <Cards
//       date="19/02/2022"
//         title="8Baked Cod with Vegetables"
//         description="Take your boring salads up a knotch. This recipe is perfect for lunch
//         and only contains 5 ingredients! sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
//         nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing
//         elit, sed do eiusmod tempor incididunt ut labore et dolore magna
//         aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
//         laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur
//         adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
//         magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
//     /> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Cards(props) {
//   console.log("inside cards");
//   const cookies = new Cookies();
//   const navigate = useNavigate();
//   return (
//     <div className="card">
//       <Card.Body className="card__body">
//         <div>
//           <Card.Title className="card__date">{props.date}</Card.Title>
//         </div>
//         <div className="card__content">
//           <Card.Title className="card__title">{props.title}</Card.Title>
//           <Card.Text className="card__description">
//             <ShowMoreText
//               /* Default options */
//               lines={3}
//               more="Show more"
//               less="Show less"
//               className="content-css"
//               anchorClass="my-anchor-css-class"
//               onClick={() => {
//                 cookies.set("date", props.date, { path: "/" });
//                 cookies.set("title", props.title, { path: "/" });
//                 cookies.set("content", props.description, { path: "/" });
//                 console.log("Cookies", cookies.get("date"));
//                 console.log("Cookies title", cookies.get("title"));
//                 console.log(props.date);
//                 console.log(props.title);
//                 navigate("/viewentry");
//               }}
//               expanded={false}
//               width={480}
//               truncatedEndingComponent={"... "}
//             >
//               {props.description}
//             </ShowMoreText>
//           </Card.Text>
//         </div>
//       </Card.Body>
//     </div>
//   );
// }
// export default AllEntries;
// {
//   /* <div>
// {allData.map(item => (
//         <li key={item.id}>
//           Title:{item.title}
//           <hr></hr>
//         Content:{item.content}
//         </li>
//              ))}
// </div> */
// }

// // const view = (props) => {
// //     alert("inside view");
// //     navigate('/viewentry', {
// //          data: props.date
// //      })
// //      console.log(props.date);
// //    };

// // const view=()=>{
// //     alert("go");
// //  navigate('/viewentry');
// // }
