import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const options = [
  { title: "Contact Us", link: "/contact" },
  { title: "About Us", link: "/about" }
];

const ITEM_HEIGHT = 48;

class Header extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div
        style={{
          background: "#5d248a",
          color: "#ffffff"
        }}
        className="header"
      >
        <Grid container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={10} sm={9}>
            NGO Dashboard
          </Grid>
          <Grid item xs={2} sm={1}>
            <IconButton
              aria-label="More"
              aria-owns={anchorEl ? "long-menu" : null}
              aria-haspopup="true"
              style={{ color: "#ffffff", marginTop: "-20px" }}
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option.title}
                  selected={option === "Pyxis"}
                  onClick={this.handleClose}
                  component={Link}
                  to={option.link}
                >
                  {option.title}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Header;
