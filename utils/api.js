import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'udacimobile:flashcards'

const dummyData = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
	JavaScript: {
		title: 'JavaScript',
		questions: [
			{
				question: 'What is a closure?',
				answer: 'The combination of a function and the lexical environment within which that function was declared.'
			}
		]
	}
}

function setDummyData () {
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
	return dummyData
}

function formatResults(results) {
	return results === null ? setDummyData() : JSON.parse(results)
}

export function getDecks(){
	return AsyncStorage.getItem(STORAGE_KEY)
		.then(formatResults)
}

export function getDeck(title){
	return AsyncStorage.getItem(STORAGE_KEY)
		.then(formatResults)
		.then((results) => {
			return results[title]
		})
}

export function saveDeckToTitle(title){
	return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
		[title]: {
			title: title,
			questions: [],
		},
	}))
}

export function addCardToDeck(title, {question, answer}){
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[title].questions.push({
				question: question,
				answer: answer,
			})
			return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
		})
}
