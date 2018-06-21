import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/api'
import TextButton from './TextButton'
import styles from './Styles'
import { clearLocalNotification, setLocalNotification } from '../utils/notify'

class Quiz extends Component {
	state = {
		currentIndex: 0,
		revealed: false,
		deck: {
			title: '',
			questions: [],
		},
		responses: {
			correct: 0,
			incorrect: 0,
		},
	}
	componentDidMount(){
		this.load()
	}
	load = () => {
		getDeck(this.props.navigation.state.params.deckId).then((deck) => {
			this.setState({
				ready: true,
				currentIndex: 0,
				deck,
				responses: {
					correct: 0,
					incorrect: 0,
				},
			})
		})
	}
	flip = () => {
		const { revealed } = this.state
		this.setState({
			revealed: ! revealed,
		})
	}
	respond = (correctness) => {
		return () => {
			let { responses, currentIndex } = this.state
			responses[ correctness ] += 1
			//responses[ currentIndex ] = correctness

			currentIndex += 1
			this.setState({
				revealed: false,
				responses,
				currentIndex,
			})
			if( this.state.deck.questions.length <= currentIndex ){
				clearLocalNotification().then( setLocalNotification )
			}
		}
	}
	render(){
		if( ! this.state.ready ){
			return (
				<AppLoading />
			)
		}

		const cards = this.state.deck.questions
		const { currentIndex, revealed } = this.state

		if( cards.length <= currentIndex ){
			const { correct, incorrect } = this.state.responses
			const { navigation } = this.props
			const { navigate } = navigation
			const { deckId } = navigation.state.params
			return (
				<View style={styles.container}>
					<View style={{flex:1, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
						<Text style={{fontSize: 60, marginBottom: 20}}>
							{(100 * correct / cards.length).toFixed()}%
						</Text>
						<Text style={{color:'green', fontSize: 20}}>
							Correct: {correct}
						</Text>
						<Text style={{color:'red', fontSize: 20}}>
							Incorrect: {incorrect}
						</Text>
					</View>
					<View>
						<TextButton backgroundColor='white' color='black' onPress={()=>{
							this.load()
						}}>
							Restart Quiz
						</TextButton>
						<TextButton onPress={()=>{
							navigate('Deck', {deckId})
						}}>
							Back to Deck
						</TextButton>
					</View>
				</View>
			)
		}

		const card = cards[ currentIndex ]
		return (
			<View style={{flex:1}}>
				<View>
					<Text>
						{currentIndex + 1} / {cards.length}
					</Text>
				</View>
				<View style={{
					flex:1,
					justifyContent: 'center',
					padding: 10,
				}}>
					<Text style={styles.deckText}>
						{ ! revealed ? card.question : card.answer }
					</Text>
					<TouchableOpacity onPress={this.flip} style={{padding: 20}}>
						<Text style={styles.flipText}>
							{ revealed ? 'Question' : 'Answer' }
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{marginBottom: 30}}>
					<TextButton borderColor='green' backgroundColor='green' onPress={this.respond('correct')}>
						Correct
					</TextButton>
					<TextButton borderColor='red' backgroundColor='red' onPress={this.respond('incorrect')}>
						Incorrect
					</TextButton>
				</View>
			</View>
		)
	}
}

export default Quiz
