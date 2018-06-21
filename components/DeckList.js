import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { AppLoading } from 'expo'
import { getDecks } from '../utils/api'
import styles from './Styles'

class DeckList extends Component {
	state = {
		ready: false,
		decks: {},
	}
	componentDidMount(){
		this.load()
		this.props.navigation.addListener('willFocus', this.load)
	}
	load = () => {
		const { dispatch } = this.props
		getDecks()
			.then((decks) => { this.setState({
				ready:true,
				decks,
			}) })
	}
	render(){
		const decks = Object.keys(this.state.decks).map((key) => {
			return {...this.state.decks[key], key}
		})

		if( this.state.ready === false ){
			return (
				<AppLoading />
			)
		}
		return (
			<FlatList data={decks} renderItem={(item) => {
				const deck = item.item
				const length = deck.questions.length
				return (
					<TouchableOpacity style={styles.item} key={deck.key} onPress={()=>{
						this.props.navigation.navigate('Deck', {deckId: deck.key})
					}}>
						<Text style={{textAlign: 'center', fontSize: 20}}>
							{deck.title}
						</Text>
						<Text style={{textAlign: 'center', color: '#aaa'}}>
							{length} card{length === 1 ? '' : 's'}
						</Text>
					</TouchableOpacity>
				)
			}} />
		)
	}
}

export default DeckList
