import React, { Component } from 'react';

class ChatBar extends Component {

	render() {
		return (
			<footer className="chatbar">
				<input
					onBlur= {this.props.onUserUpdate}
					defaultValue = {this.props.currentUser}
					// value= {this.props.userName}
					className="chatbar-username"
					placeholder="Your Name (Optional)"
				/>

		<form onSubmit={this.props.onSubmit} >
				<input
					value = {this.props.content}
					onChange = {this.props.onChange}
					className="chatbar-message"
					placeholder="Type a message and hit ENTER"
				/>
				</form>
			</footer>
		);
	}
}
export default ChatBar;
