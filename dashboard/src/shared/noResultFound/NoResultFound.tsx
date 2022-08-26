import { FC, memo } from "react";
import { Grid, Header } from "semantic-ui-react";

const NoResultFound: FC<{ text: string }> = ({ text }) => {
  return (
    <Grid
      textAlign="center"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img src="no-result.svg" alt="No Search Result Found!" />
      <Header as="h5" inverted>
        {text}
      </Header>
    </Grid>
  );
};

export default memo(NoResultFound);
