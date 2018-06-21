import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'

export default function TextButton({ children, onPress, style={}, color='white', backgroundColor='black', borderColor='black' }){
	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style, {backgroundColor,borderColor}]}>
			<Text style={[styles.buttonText, style, {color}]}>
				{children}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	buttonText: {
		paddingLeft: 20,
		paddingRight: 20,
		fontSize: 22,
		textAlign: 'center',
	},
	button: {
		marginTop: 15,
		marginLeft: 20,
		marginRight: 20,
		padding: 15,
		borderWidth: 2,
		borderRadius: Platform.OS === 'ios' ? 15: 2,
	},
})
