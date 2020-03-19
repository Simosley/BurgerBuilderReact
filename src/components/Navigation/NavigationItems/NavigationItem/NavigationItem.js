import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const navigationItem = props => (
  <ul className={classes.NavigationItem}>
    <NavLink exact to={props.link} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </ul>
);

export default navigationItem;
