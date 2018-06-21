import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput } from 'react-native'
import TextButton from './TextButton'
import styles from './Styles'
import { saveDeckToTitle } from '../utils/api'

class NewDeck extends Component {
	state = {
		title: '',
	}
	submit = () => {
		const { title } = this.state
		saveDeckToTitle(title).then(() => {
			this.setState({title: ''})
			this.props.navigation.navigate('DeckList') // end up on DeckList when navigating back from the Deck
			this.props.navigation.navigate('Deck', {deckId: title}) // navigate to the new Deck
		})
	}
	render(){
		return (
			<KeyboardAvoidingView behavior='padding' enabled
				style={{flex:1, justifyContent: 'center'}}
			>
				<Text style={styles.deckText}>
					What is the title of your new deck?
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Deck Title"
					autoFocus={true}
					onChangeText={(title)=>this.setState({title})}
					value={this.state.title}
				/>
				<View style={{alignItems:'center'}}>
					<TextButton onPress={this.submit}>
						Create Deck
					</TextButton>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

export default NewDeck
