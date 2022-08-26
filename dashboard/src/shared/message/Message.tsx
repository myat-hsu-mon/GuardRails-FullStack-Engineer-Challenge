import { FC } from "react";
import { Grid, Message } from "semantic-ui-react";

interface IMessageUIProps {
  message: string;
  success: boolean;
}

const MessageUI: FC<IMessageUIProps> = ({ message, success }) => (
  <Grid
    textAlign="center"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Message negative={!success} success={success}>
      <Message.Header>{message}</Message.Header>
    </Message>
  </Grid>
);

export default MessageUI;
