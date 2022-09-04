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

	//FUNCTION TO YOU SELECT THE IMAGE
	async function selectImage(){
		setSave(!save)

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

	useEffect(() => {
        if (animation.current) {
            if (save) {
                animation.current.play(0, 211)
            }
            animation.current == false
        }
        if (animation.current == false) {
            animation.current.play(0, 0)
        }
    }, [save])

	return (
	  	<View style={ styles.container }>

		<Lottie source={require('../imgs/photosAnimations.json')} 
			autoPlay={false} 
			loop={false} 
			style={{widht: 300, height: 300}}
			onAnimationFinish = {() => {
				animation.current.play(0, 0)
			}}
			ref={animation} />

	  	<Text style={ styles.text }>SELECIONE SUA IMAGEM</Text>

	  	<TouchableOpacity onPress={ () => { selectImage() } }  style={ styles.button } >
	  		<Text style={ styles.textButton }>+</Text>
	  	</TouchableOpacity>
	  	
	  </View>
	);
}


export default Home;