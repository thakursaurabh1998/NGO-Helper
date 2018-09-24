import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import StarIcon from "@material-ui/icons/Star";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";

const styles = {
  root: {
    width: "100vw"
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: "home"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount = () => {
    let value = window.location.pathname.split("/")[1];
    if (value === "") value = "distribute";
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Distribute"
          value="distribute"
          icon={<PeopleIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Validate"
          value="validate"
          icon={<StarIcon />}
          component={Link}
          to="/validate"
        />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBottomNavigation);
