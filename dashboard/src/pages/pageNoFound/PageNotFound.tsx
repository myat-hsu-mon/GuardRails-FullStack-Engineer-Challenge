import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header } from "semantic-ui-react";

const PageNotFound: FC = () => {
  return (
    <Grid
      textAlign="center"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        height: "100vh",
      }}
    >
      <img src="no-result.svg" alt="No Search Result Found!" />
      <Header as="h5">Page Not Found</Header>
      <Link to="/">
        <Button>Go To Home</Button>
      </Link>
    </Grid>
  );
};

export default PageNotFound;
