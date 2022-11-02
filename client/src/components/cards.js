import { useNavigate } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { Row, Card } from "react-bootstrap";
import Cookies from "universal-cookie";
// import { Link } from "react-router-dom";
// import ViewEntry from "./viewEntry";

const Cards = (props) => {
  // const cookies = new Cookies();
  const navigate = useNavigate();
  const setTitle = props.setTitle;

  const title = props.title;
  const setDate = props.setDate;
  const date = props.date;
  const setDescription = props.setDescription;
  // const description = props.description;

  const view = (props) => {
    setTitle(props.title);
    setDate(props.date);
    setDescription(props.description);
    console.log("CHEHCK", setTitle, title, setDate, date);
    navigate("/viewentry");
  };
  return (
    <div className="card mb-5">
      <Card className="Card">
        <Card.Body
          onClick={() => {
            view(props);
          }}
        >
          <Row>
            <div className="col-lg-2">
              <Card.Text className="mt-3">{props.date}</Card.Text>
            </div>
            <div className="col-lg-8">
              <Card.Title>{props.title}</Card.Title>

              <Card.Text>
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={() => {
                    // setTitle(props.title);
                    // console.log("onclick", setTitle);
                    view(props);
                  }}
                  // cookies.set("title", props.title, { path: "/" });
                  // cookies.set("content", props.description, { path: "/" });
                  // console.log("Cookies", cookies.get("date"));
                  // console.log("Cookies title", cookies.get("title"));
                  // console.log(props.date);
                  // console.log(props.title);
                  // navigate("/viewentry");
                  expanded={false}
                  width={450}
                  truncatedEndingComponent={"... "}
                >
                  {props.description}
                </ShowMoreText>
              </Card.Text>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
