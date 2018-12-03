import React, { Component } from 'react';
import { Imagem, Video, Audio } from './Media';
import moment, { now } from 'moment';
import 'moment/locale/pt-br'
import '../style/NewsItem.css';
moment.locale('pt-br');
class NewsItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: props.item,
			key: props.id
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ 
			item: nextProps.item,
			key: nextProps.id
		});
	}

	componentDidMount() {
		// console.log("NewsItem", this.state.item);
	}

	render() {
		return (
			<div className="newsItem">
				<div className="headline upper">{this.state.item.titulo}</div>
				<div className="adtInfo">
					<div className="timestamp"> {moment(this.state.item.data).format("DD/MM/YY - HH:mm:ss")} </div>
					<div className="timestamp"> {moment(this.state.item.data).fromNow()}</div>
				</div>
				<div className="adtInfo"><p>{this.state.item.nome_autor}</p></div>
				<div className="media">
					<Video link={this.state.item.link_video} />
					<Imagem link={this.state.item.link_imagem} />
				</div>
				<div className="texto" dangerouslySetInnerHTML={{__html: this.state.item.texto}}></div>
				{this.state.item.link && <a className="link" href={this.state.item.link}>Leia mais</a>}
			</div>
		);
	}
}

export default NewsItem;