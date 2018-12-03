import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment'
import NewsList from './NewsList';

import NewsItem from './NewsItem';

import '../style/NewsAdd.css';

class NewsAdd extends Component {
	constructor(props) {
		super(props);

		this.state = {
			key: null,
			valid: false,
			item: {},
			redirect: false,
		}
	}

	handleKeyChange = (e) => {
		console.log(e.target.value)
		this.setState({key: e.target.value});
	}

	handleSignIn = () => {
		console.log(this.state.key)
		let url = 'http://app.campus.fac.unb.br/access/'; 

    axios.post(url, {"chave":this.state.key}).then(
      res => {
				console.log(res.data)
				if(res.data.response.length)
					this.setState({valid:true});
				else 
					alert("Chave inválida!");
      }, 
      err => {
        alert("Erro ao logar com chave!");
      }
    );
	}

	handleNewsAdd = (e) => {
		e.preventDefault();
		console.log(this.state.item)
		let url = 'http://app.campus.fac.unb.br/addnews/'; 

		axios.post(url, this.state.item).then(
      		res => {
				console.log(res.data.response);
				this.setState({ redirect: true });
			}, 
      		err => {
        		alert("Erro ao adicionar noticia!");
			}
			  
    	);
	}

	handleItem = (e) => {
		let itemState = this.state.item;
		if( e.target.name === "link_video" ) {
			document.getElementById("link_imagem").hidden = e.target.value !== "";
			this.setState({item: {...itemState, id:0, link_imagem: null, link_video: 'https://' + e.target.value}});
		} else
		if( e.target.name === "link_imagem" ) {
			document.getElementById("link_video").hidden = e.target.value !== "";
			this.setState({item: {...itemState, id:0, link_video: null, link_imagem: 'https://' + e.target.value}});
		} else
		if( e.target.name === "texto" && e.target.value.length > 0 ) {
			var str = '<p>' + e.target.value.replace(/(?:\r\n|\r|\n)/g, '</p><p>') + '</p>';
			this.setState({item: {...itemState, id:0, [e.target.name]: str}});
		} else {
			this.setState({item: {...itemState, id:0, [e.target.name]: e.target.value}});
		}
	}

	componentDidUpdate() {
		if( this.state.valid ) {
			document.getElementById("Adicionar").disabled = !(this.state.item.titulo && this.state.item.texto);
		}
	}
	
	render() {
		if (!this.state.valid) {
			return (
				<div className="key-login">
					<p> <Link className="btn" to='/'>Home</Link> </p>
					<h3>Chave de Acesso</h3>
					<input type="password" placeholder="chave" onChange={(e) => {this.setState({key: e.target.value})}}/>
					<button onClick={this.handleSignIn.bind(this)}> Acessar </button>
			</div>
			);
		} else {
			if (this.state.redirect) {
				return <Redirect to='/'/>;
			}

			return (
				<div className="news-add">
					<form onSubmit={this.handleNewsAdd}>
						<p> <Link className="btn" to='/'>Home</Link> </p>
						<h3>Titulo</h3>
						<input className="upper" type="text" placeholder="Título da notícia" name="titulo" onChange={this.handleItem}/>
						<h3 hidden>Resumo</h3>
						<textarea hidden rows="4" cols="50" placeholder="resumo" name="resumo" onChange={this.handleItem}/>
						<h3>Texto</h3>
						<textarea rows="4" cols="50" placeholder="Texto da notícia" name="texto" onChange={this.handleItem}/>
						<h3>Link Externo</h3>
						<input type="text" placeholder="Link para leia mais" name="link" onChange={this.handleItem}/>
						<div id="link_video">
							<h3>Link Video</h3>
							<p>O link deve ser no formato youtube.com/embed/XXXXXX</p>
							https://<input type="text" placeholder="Vídeo" name="link_video" onChange={this.handleItem}/>
						</div>
						<div id="link_imagem">
							<h3>Link Foto</h3>
							<p>O link deve ser no formato i.imgur.com/XXXXXXXX.XXX</p>
							https://<input type="text" placeholder="Foto" name="link_imagem" onChange={this.handleItem}/>
						</div>
						<div id="nome_autor">
							<h3>Nome do Autor</h3>
							<input type="text" placeholder="Nome do Autor" name="nome_autor" onChange={this.handleItem}></input>
						</div>
						{/* <h3>Link Audio</h3>
						<input type="text" placeholder="Áudio" name="link_audio" onChange={this.handleItem}/> */}
						<h1>Preview</h1>
						<div className="preview">
							<NewsItem item={this.state.item} id={0} />
						</div>
						<p>
						<button id="Adicionar" type="submit" disabled>Adicionar</button>
						</p>
					</form>
					<div style={{height: 120 + 'px'}}></div>
				</div>
			);
		}
	}
};


export default NewsAdd;