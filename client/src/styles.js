import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "./images/background.jpg";

export default makeStyles(theme => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  bgImage: {
    backgroundImage: `url(${BackgroundImage})`,
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
