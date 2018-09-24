import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Email";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as utils from "../utils/utils";

const styles = theme => ({
  card: {
    maxWidth: 400,
    maxHeight: 500,
    height: 430
  },
  media: {
    // height: 0,
    // maxHeight: 400,
    paddingTop: "56.25%", // 16:9
    width: "100%",
    height: "80px",
    overflowY: "hidden",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class MyCard extends React.Component {
  acceptData = (id, distributed_index) => {
    utils.postValidate({ id });
    this.props.update(distributed_index);
  };

  ignoreData = () => {
    // utils.postDistribute({ email, contact, distributed_index, distributed_to });
    this.props.update();
  };

  render() {
    const {
      classes,
      name,
      id,
      index,
      email,
      contact,
      imgURL,
      item
    } = this.props;
    return (
      <div
        style={{
          margin: "10px"
        }}
      >
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {name[0]}
              </Avatar>
            }
            style={{ textAlign: "left" }}
            title={name}
            subheader={email + ` (${item})`}
          />
          <CardMedia className={classes.media} image={imgURL} />
          <CardContent>
            <Grid container>
              <Grid item xs={4} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.acceptData(id, index)}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => this.ignoreData()}
                >
                  Ignore
                </Button>
              </Grid>
              <Grid item xs={2} sm={2}>
                <IconButton aria-label="Add to favorites">
                  <a style={{ color: "#0000008a" }} href={`tel:${contact}`}>
                    <PhoneIcon />
                  </a>
                </IconButton>
              </Grid>
              <Grid item xs={2} sm={2}>
                <IconButton aria-label="Share">
                  <a style={{ color: "#0000008a" }} href={`mailto:${email}`}>
                    <MailIcon />
                  </a>
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing />
        </Card>
      </div>
    );
  }
}

MyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCard);
