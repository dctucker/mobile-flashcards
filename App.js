import React from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
	createBottomTabNavigator, createMaterialTopTabNavigator,
	createStackNavigator
} from 'react-navigation'
import reducer from './reducers/index'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { setLocalNotification } from './utils/notify'


if( Platform.OS === 'ios' ){
	var createTabNav = createBottomTabNavigator
} else {
	var createTabNav = createMaterialTopTabNavigator
}

const TabNav = createTabNav({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-variant' size={30} color={tintColor} />
		},
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor} />
		},
	},
}, {
	navigationOptions: {
	},
})

const StackNav = createStackNavigator({
	Home: {
		screen: TabNav,
		navigationOptions: {
			title: 'Decks',
			headerStyle: {
				backgroundColor: 'white',
			},
			headerTintColor: 'black',
		},
	},
	Deck: {
		screen: Deck,
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			title: 'Quiz',
		},
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: {
			title: 'Add Card',
		},
	},
}, {
	navigationOptions: {
		headerStyle: {
			backgroundColor: 'black',
		},
		headerTintColor: 'white',
	},
})

function DeckStatusBar({ backgroundColor, ...props }){
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	)
}

export default class App extends React.Component {
	componentDidMount(){
		setLocalNotification()
	}
	render() {
		return (
			<View style={{flex:1}}>
				<StackNav />
			</View>
		);
	}
}

/*
	DONE	Use create-react-native-app to build your project.
	DONE	Allow users to create a deck which can hold an unlimited number of cards.
	DONE	Allow users to add a card to a specific deck.
	DONE	The front of the card should display the question.
	DONE	The back of the card should display the answer.
	DONE	Users should be able to quiz themselves on a specific deck and receive a score once they're done.
	TODO	Users should receive a notification to remind themselves to study if they haven't already for that day.
*/
