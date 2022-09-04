import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},

	moldura: {
		width: 300,
		height: 300,
	},

	imagem: {
		width: 300,
		height: 300,
	},

	saveButton: {
		backgroundColor: '#808000',
		padding: 10,
		borderRadius: 10,
		width: '100%',
		alignItems: 'center',
		marginTop: 50
	},

	text: {
		color: '#ffffff', 
		fontSize: 16
	}
})

export default styles