import * as React from 'react';
import {
  Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent {
  state = {
    isOpen: false
  };

  render() {
    const { isOpen } = this.state;

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={ Link } to="/">SudokuSocket</NavbarBrand>
            <NavbarToggler onClick={ this.toggle } className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={ isOpen } navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={ Link } className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ Link } className="text-dark" to="/server-test">Server Test</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }

  toggle = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }
}
