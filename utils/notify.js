import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export const NOTIFICATION_KEY = 'udacimobile:flashcards:notifications'

export function clearLocalNotification () {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
	return {
		title: 'Quiz time',
		body: "👋 don't forget to take a quiz today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: true,
			vibrate: false,
		}
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if( true || data === null) {
				console.log('asking permissions')
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						console.log(status)
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync()

							let tomorrow = new Date()
							tomorrow.setDate(tomorrow.getDate() + 1)
							tomorrow.setHours(19)
							tomorrow.setMinutes(30)

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							)

							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
						}
					})
			}
		})
}
