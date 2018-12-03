import React, { Component } from 'react';
import NewsList from './NewsList'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import testImg from '../icon.png'
import 'react-datepicker/dist/react-datepicker.css';
import '../style/App.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {date: moment(), 
                  calendarOpen: false, 
                  newsList: []};

    
    this.updateDate = this.updateDate.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.requestNews = this.requestNews.bind(this);
  }

  componentWillMount () {
    this.requestNews();

    // this.addNews( {
    //   data: moment('02/05/2018', 'DD/MM/YYYY'),
    //   titulo: "Assembléia geral dos estudantes",
		// 	texto: "<p>O DCE Honestino Guimarães convoca todos os estudantes da UnB a participarem da assembléia geral que tem como pauta o indicativo de greve estudantil. A reunião vai acontecer hoje ao meio-dia no Ceubinho.</p>",
    //   link: null,
    //   link_video: null,
		// 	link_imagem: "https://i.imgur.com/0290eG5.jpg",
		// 	link_audio: null
		// } );

		// this.addNews( {
    //   data: moment('02/05/2018', 'DD/MM/YYYY'),
    //   titulo: "Doação de sangue HUB",
		// 	texto: "<p>Começa hoje a campanha de doação de sangue do Hospital Universitário de Brasília (HUB). Este ano, foi criada uma gincana para estimular a comunidade acadêmica a doar sangue e os vencedores vão receber vale-prêmios de até 250 reais.",
    //   link: "#",
    //   link_video: null,
    //   link_imagem: "https://i.imgur.com/B2QALtj.jpg",
    //   link_audio: null
		// } );
	}

	addNews( news ) {
    this.state.newsList.push( news );
	}

  updateDate(date) {
    this.setState({date}, () => {
      this.toggleCalendar();
      this.requestNews();
    });
  }

  toggleCalendar (e) {
    e && e.preventDefault()
    this.setState({calendarOpen: !this.state.calendarOpen})
  }

  requestNews () {
    let url = 'http://app.campus.fac.unb.br/news/20/' + this.state.date.format("YYYY-MM-DD"); 

    axios.get(url).then(
      res => {
    ;    // console.log("Home", res.data.response);
        this.setState({newsList: []});
        this.setState({newsList: res.data.response});
      }, 
      err => {
        console.log("Não conseguiu buscar do banco!")
      }
    );
  }

  render() {
    return (
      <div id="Home">
        <div className="app-content">
          <div id="calendar-region">
            <button
              className="calendar-button"
              onClick={this.toggleCalendar}>
              <h3>
                {this.state.date.format("DD/MM/YYYY")}
              </h3>
            </button>
          </div>

            <NewsList list={this.state.newsList} />
            
            {
              this.state.calendarOpen && (
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  minDate={moment("2018-04-18")}
                  maxDate={moment()}
                  selected={this.state.date}
                  onChange={this.updateDate}
                  withPortal
                  inline 
                />
              )
            }
            
        </div>
      </div>
    );
  }
}


export default Home;