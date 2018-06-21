import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import TextButton from './TextButton'
import styles from './Styles'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}
	submit = () => {
		const { deckId } = this.props.navigation.state.params
		const { question, answer } = this.state
		addCardToDeck(deckId, {question, answer}).then(() => {
			this.setState({question: '', answer: ''})
			this.props.navigation.navigate('Deck', {deckId})
		})
	}
	render(){
		return (
			<KeyboardAvoidingView behavior='padding' enabled
				style={{flex:1, justifyContent: 'center'}}
			>
				<TextInput
					style={styles.input}
					placeholder="Question"
					autoFocus={true}
					onChangeText={(question)=>this.setState({question})}
					value={this.state.question}
				/>
				<TextInput
					style={styles.input}
					placeholder="Answer"
					onChangeText={(answer)=>this.setState({answer})}
					value={this.state.answer}
				/>
				<View style={{alignItems:'center'}}>
					<TextButton onPress={this.submit}>
						Save Card
					</TextButton>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default AddCard
