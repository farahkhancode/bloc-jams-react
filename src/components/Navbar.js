import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  constructor(props) {
   super(props);

 }

  render() {
   return (
     <nav className= "navbar">
     <Link to='/' className = "badge badge-secondary">Home</Link>
     <Link to='/library' className  = "badge badge-secondary">Library</Link>
   </nav>
    );
  }
}

export default Navbar;
