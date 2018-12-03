import React, { Component } from 'react';
import moment from 'moment';

import NewsItem from './NewsItem';

import '../style/NewsList.css';

class NewsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			item: props.item,
			key: props.id
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			 list: nextProps.list,
			 item: nextProps.item,
			 key: nextProps.id
		});
	}

	componentDidMount(){
		// console.log("NewsList", this.state.list);
	}

	render() {
		var content = [];
		if( this.state.list.length === 0 ) {
			content = <span>Nenhuma notícia publicada nesse dia</span>;
		} else {

			var newsList = this.state.list.sort( (a, b) => {
										return moment( a.data ).isBefore( b.data );
									} );

			var prevDate = moment( newsList[0].data );
			var key = 0;
			content.push( <NewsItem item={newsList[0]} key={key++} id={newsList[0].id} /> );
			for( let i = 1; i < newsList.length; i++ ) {
				var curDate = moment( newsList[i].data );
				if( !prevDate.isSame( curDate, 'day' ) ) {
					prevDate = curDate;
					content.push( <div className='dateDivider' key={key++}>{ prevDate.format( 'DD/MM/YYYY' ) }</div> );
				}
				content.push( <NewsItem item={newsList[i]} key={key++} id={newsList[i].id} /> );
			}
		}
		return(
			<div className="newsList">
				{content}
				<div style={{height: 100 + 'px'}}></div>
			</div>
		);
	}
}

export default NewsList;