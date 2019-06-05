import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';




class App extends Component {
constructor(props){
	super(props);

	this.state = {
		content: '',

		currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
		messages: [
		{
			id: "01",
			username: "Bob",
			content: "Has anyone seen my marbles?",
		},
		{	id: "02",
			username: "Anonymous",
			content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
		}
		]
	}
	this.onContent = this.onContent.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}


onContent(event) {
	this.setState({
		content: event.target.value
	});
}

onSubmit(event) {
	event.preventDefault(); 
	const newMessage = {id: new Date(), username: this.state.currentUser.name, content: this.state.content};
    const messages = this.state.messages.concat(newMessage)
	this.setState({messages: messages})
	this.state.content='';
}
componentDidMount() {
	const socketUrl = 'ws://localhost:3001';
	

    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = this.handleOnOpen;

    this.socket.onmessage = this.handleOnMessage;

	this.socket.onerror = this.handleOnError;
	console.log('connect to server')
  }

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
