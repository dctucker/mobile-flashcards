import React from 'react'
import { Platform, StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	item: {
		backgroundColor: '#fff',
		borderRadius: Platform.OS ==='ios' ? 16 : 2,
		padding: 10,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 16,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		}

	},
	noDataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20,
	},
	container: {
		flex: 1, padding: 20, backgroundColor: 'white',
		justifyContent: 'center',
	},
	row: {flexDirection:'row', flex: 1, alignItems: 'center'},
	center: {flex:1, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30},
	deckText: {
		textAlign: 'center',
		fontSize: 36,
	},
	flipText: {
		textAlign: 'center',
		fontSize: 24,
		color: 'red',
	},
	input: {
		margin: 20,
		padding: 10,
		height: 40,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: 'white',
	},
})

export default Styles
