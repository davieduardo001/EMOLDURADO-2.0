import React from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker'; 

import styles from '../styles/home.js'

//MAIN FUNCTION OF THIS VIEW
function Home({ navigation }) {

	//VARIABLES FOR SET THE IMAGE
	const [imageUri, setimageUri] = React.useState('')

	//FUNCTION TO YOU SELECT THE IMAGE
	async function selectImage(){

		const options = {
			storageOptions:{
				path: 'images',
				mediaType: 'photo',
			},
			includeBase64: true,
		}
		
		launchImageLibrary(options, response => {
			console.log('RESPONSE = ', response)

			if (response.didCancel) {
				console.log('user cancelled image picker')
			} else if (response.error) {
				console.log('imagePicker error: ', response.error)
			} else if (response.customButton) {
				console.log('user tapped custom button: ', response.customButton)
			} else {
				const source = {uri: response.assets[0].uri }
				setimageUri(source)
				console.log('the selected image is: ', source)

				Alert.alert(
					"IMAGEM SELECIONADA",
					"Sua imagem foi selecionada com sucesso! clique OK para continuar sua edição!",
					[
						{ text: "OK", onPress: () => navigation.navigate('Config', { image: source }) }
					]
				)
			}
		})
	}

	return (
	  <View style={ styles.container }>

	  	<Text style={ styles.text }>SELECIONE SUA IMAGEM</Text>

	  	<TouchableOpacity onPress={ () => { selectImage() } }  style={ styles.button } >
	  		<Text style={ styles.textButton }>+</Text>
	  	</TouchableOpacity>
	  	
	  </View>
	);
}


export default Home;