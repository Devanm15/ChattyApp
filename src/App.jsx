import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';






class App extends Component {
constructor(props){
	super(props);

	this.state = {
		content: '',

		currentUser: {name: "Bob"},
		messages: []
	}
	this.onContent = this.onContent.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}


onContent(event) {
	this.setState({
		content: event.target.value
	});
}

buildMessage(username, content){
	const newMessage = {username: username, content: content};
	return newMessage;
}
onSubmit(event) {
	event.preventDefault(); 
	const newMessage = this.buildMessage(this.state.currentUser.name, this.state.content)
	this.socket.send(JSON.stringify(newMessage));
	// const messages = this.state.messages.concat(newMessage)
	this.setState({messages: messages})
	this.state.content='';
}

componentDidMount() {
	const socketUrl = 'ws://localhost:3001';
	this.socket = new WebSocket(socketUrl);
  }
// this,

//   console.log("componentDidMount <App />");
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
//     const messages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: messages})


	render() {
		return (
			<div>
				<nav className="navbar">
					<a href="/" className="navbar-brand">
						Chatty
					</a>
				</nav>
				<MessageList messages={this.state.messages}/>
				<ChatBar user={this.state.currentUser}
				content={this.state.content} onChange={this.onContent} onSubmit={this.onSubmit}/>
			</div>
		);
	}
}
export default App;
