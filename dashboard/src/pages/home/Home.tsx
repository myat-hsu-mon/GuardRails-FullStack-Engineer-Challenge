import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#153D50",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Header
          as="h1"
          color="orange"
          size="huge"
          style={{ fontSize: "80px", fontWeight: "bold" }}
        >
          Security-First
        </Header>
        <Header as="h2" color="grey">
          Deliver the applications secure most
        </Header>
        <Button
          onClick={() => navigate("/results")}
          size="large"
          style={{ marginTop: "20px" }}
        >
          Get Started
          <Icon name="arrow right" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
