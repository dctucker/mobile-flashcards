import React, { Component } from 'react'
import { Platform, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { getDeck } from '../utils/api'
import TextButton from './TextButton'
import styles from './Styles'

class Deck extends Component {
	state = {
		ready: false,
		decks: {},
	}
	static navigationOptions = ({navigation}) => {
		const { deckId } = navigation.state.params

		return {
			title: deckId,
		}
	}
	componentDidMount(){
		this.load()
		this.props.navigation.addListener('willFocus', this.load)
	}
	load = () => {
		getDeck(this.props.navigation.state.params.deckId).then((deck) => {
			this.setState({
				ready: true,
				deck,
			})
		})
	}
	render(){
		if( ! this.state.ready ){
			return (
				<AppLoading />
			)
		}
		const { navigate } = this.props.navigation
		const { deckId } = this.props.navigation.state.params
		const { title, questions } = this.state.deck
		const length = questions.length
		return (
			<View style={styles.container}>
				<View style={{
					marginBottom: 90,
				}}>
					<Text style={styles.deckText}>
						{title}
					</Text>
					<Text style={{
						textAlign: 'center',
						color: '#aaa'
					}}>
						{length} card{length === 1 ? '' : 's'}
					</Text>
				</View>
				<TextButton color='black' backgroundColor='white' onPress={()=>{
					navigate('AddCard', {deckId})
				}}>
						Add Card
				</TextButton>
				<TextButton color='white' backgroundColor='black' onPress={()=>{
					navigate('Quiz', {deckId})
				}}>
						Start Quiz
				</TextButton>
			</View>
		)
	}
}

export default Deck
