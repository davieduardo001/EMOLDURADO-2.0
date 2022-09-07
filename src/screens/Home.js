import React, {useState, useRef, useEffect} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Lottie from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker'; 

import styles from '../styles/home.js'

//MAIN FUNCTION OF THIS VIEW
function Home({ navigation }) {

	//VARIABLES FOR SET THE IMAGE
	const [imageUri, setimageUri] = React.useState('')

	//VARIABLES FOR MAKE THE ANIMATION WORKS
	const [save, setSave] = useState(false)
    const animation = useRef(true)

	function sleep(ms) {
		return new Promise((accept) => {
			setTimeout(() => {
				accept()
			}, ms);
		})
	}

	//FUNCTION TO YOU SELECT THE IMAGE
	async function selectImage(){
		console.log('the bedore state od SAVE is: ' + save)

		setSave(!save)
		console.log('the SAVE state is: ' + save)
	
		await sleep(3000)

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
				
				function navigateToAnotherView() {
					navigation.navigate('Config', { image: source })
					console.log('the SAVE state is: ' + save)
				}

				Alert.alert(
					"IMAGEM SELECIONADA",
					"Sua imagem foi selecionada com sucesso! clique OK para continuar sua edição!",
					[
						{ text: "OK", onPress: () => navigateToAnotherView()}

					]
				)
			}
		})
	}

	useEffect(() => {
        if (animation.current) {
            if (save) {
                animation.current.play(0, 211)
            } else {
				animation.current.play(0, 211)
			}
        }
    }, [save])

	return (
	  	<View style={ styles.container }>

		<Lottie source={require('../imgs/photosAnimations.json')} 
			autoPlay={false} 
			loop={false} 
			style={{widht: 180, height: 180}}
			ref={animation} />

	  	<Text style={ styles.text }>SELECIONE SUA IMAGEM</Text>

	  	<TouchableOpacity onPress={ () => { selectImage() } }  style={ styles.button } >
	  		<Text style={ styles.textButton }>+</Text>
	  	</TouchableOpacity>
	  	
	  </View>
	);
}


export default Home;