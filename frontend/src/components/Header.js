import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import logo from '../Logo-Campus1.png';
import '../style/App.css';


class Header extends Component {

  constructor(props) {
    super(props);

    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  openNav() {
    document.getElementById("sidenav").style.transform = "translateX(0px)";
    document.getElementById("sidenav").style.boxShadow = "10px 0px 50px #000";
    document.getElementById("opensidenav").style.visibility = "hidden";
  }

  closeNav() {
    document.getElementById("sidenav").style.transform = "translateX(-250px)";
    document.getElementById("sidenav").style.boxShadow = "0px 0px 0px #000";
    document.getElementById("opensidenav").style.visibility = "visible";
  }

  render() {
    return (
      <div className="app">
        <header>
          <nav id="sidenav">
            <a href="" className="closebtn" onClick={e => {e.preventDefault();this.closeNav()}}><i class='material-icons'>cancel</i></a>
            
            <p>Plataformas do<br />Campus Online<br />
              <a href="http://campus.fac.unb.br/" onClick={this.closeNav}>Site</a>
              <a href="https://twitter.com/campusitounb" className="twitter" onClick={this.closeNav}>Twitter</a>
              <a href="https://www.facebook.com/onlinecampus/" className="facebook" onClick={this.closeNav}>Facebook</a>
              <a href="https://www.instagram.com/campusonline/" className="instagram" onClick={this.closeNav}>Instagram</a>
              <a href="https://www.youtube.com/channel/UC6a5zNtTLs-yGnHn9nkUIyw" onClick={this.closeNav}>Youtube</a>
            </p>
            
            <p>Links da FAC<br />
              <a href="http://fac.unb.br/" onClick={this.closeNav}>Site</a>
              <a href="https://twitter.com/fac_unb" onClick={this.closeNav}>Twitter</a>
              <a href="https://www.facebook.com/faculdadedecomunicacao/" onClick={this.closeNav}>Facebook</a>
              <a href="https://www.youtube.com/channel/UChJBFMMGoVw2yXeFIllVnZw" onClick={this.closeNav}>Youtube</a>
              <a href="https://issuu.com/campusunb" onClick={this.closeNav}>Issu</a>
            </p>
            <br/><br/>
            <p> <Link to='/addnews' onClick={this.closeNav}>Adicionar notícias</Link> </p>
          </nav>
          
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          <span id="opensidenav" className="burger" onClick={this.openNav}><i class='material-icons'>menu</i></span>
        	<link rel="manifest" href="/manifest.json"></link>

        </header>

        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
        </div>
        <footer>
          <h4>2018 FAC/CIC</h4>
        </footer>
      </div>
    )
  }
}

export default Header;