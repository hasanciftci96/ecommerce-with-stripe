import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/commerce.png"
import useStyles from "./styles"
//

const Navbar = ({ totalItems }) => {
  const classes = useStyles()
  const location = useLocation() //is a hook from react router dom

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            Commerce.js
          </Typography>
          <div className={classes.grow} />
          {/* if we are in the cart page doesnt show the cart icon */}
          {location.pathname === "/" ? (
            <div className={classes.button}>
              {/* Instead of <Link to="/cart">go to cart</Link>, material UI allows us to do the following below */}
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
