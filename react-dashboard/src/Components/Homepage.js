import React, { Component } from "react";
import Info from "./Info";
import Grid from "@material-ui/core/Grid";
import * as utils from "../utils/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Homepage extends Component {
  state = {
    feed: [],
    loading: true
  };

  handleChange = name => event => {
    const check = event.target.checked;
    this.setState({ [name]: check });
  };

  componentDidMount() {
    utils.getRequestList().then(feed => {
      this.setState({ feed, loading: false });
    });
  }

  update = index => {
    this.setState(prev => {
      let i;
      for (i = 0; i < prev.feed.length; i++)
        if (prev.feed[i].index === index) break;
      prev.feed[i].completed = true;
      return prev;
    });
  };

  render() {
    const { loading, feed } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          {loading ? (
            <CircularProgress
              style={{ marginTop: "25vh", color: "#2979ff" }}
              className={classes.progress}
              size={150}
            />
          ) : (
            <Grid container>
              {feed.map((d, i) => {
                if (!d.completed)
                  return (
                    <Grid key={i} item xs={12} sm={4}>
                      <Info
                        name={d.initiated_by}
                        index={d.index}
                        update={() => this.update(d.index)}
                        email={d.email}
                        contact={d.contact}
                        completed={d.completed}
                        imgURL={d.imgURL}
                        item={d.item}
                      />
                    </Grid>
                  );
                return null;
              })}
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Homepage);
