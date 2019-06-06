import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
constructor(props){
	super(props);

	this.state = {
		count: 0,
		content: '',
		currentUser: {name: "anonymous"},
		messages: []
	}
	this.onContent = this.onContent.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}

onUserUpdate = (event) =>{
	const oldUsername = this.state.currentUser.name;
	const newUsername = event.target.value 
	this.setState({username: newUsername});
	this.sendNotification(oldUsername, newUsername)
}
onContent(event) {
	this.setState({
		content: event.target.value
	});
}

buildMessage(username, content){
	const newMessage = {type:"postMessage", username: username, content: content};
	return newMessage;
}
onSubmit(event) {
	event.preventDefault(); 
	const newMessage = this.buildMessage(this.state.username, this.state.content)
	this.socket.send(JSON.stringify(newMessage));

	this.state.content='';
	
}

sendNotification = (oldUsername, newUsername) => {
	const newNotification = {
	  type: 'postNotification',
	  content: `${oldUsername} has changed their name to ${newUsername}`};
	  console.log(newNotification)
	  this.socket.send(JSON.stringify(newNotification));	
}


componentDidMount() {
	const socketUrl = 'ws://localhost:3001';
	this.socket = new WebSocket(socketUrl);
	
	this.socket.onmessage = (event) => {
		const messages = this.state.messages.concat([JSON.parse(event.data)])
	this.setState({messages: messages})

	}
}

	render() {
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={this.state.messages}
				user={this.state.currentUser}/>
				<ChatBar user={this.state.currentUser}
				content={this.state.content} onChange={this.onContent} onSubmit={this.onSubmit} 
				onUserUpdate={this.onUserUpdate}/>
			</div>
		);
	}
}
export default App;
