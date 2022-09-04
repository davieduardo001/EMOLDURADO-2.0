import React, { useRef, useState } from 'react';

import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from '../styles/config.js'

import ViewShot, { captureScreen } from 'react-native-view-shot';
import CameraRoll from "@react-native-community/cameraroll";

function Config({ route, navigation }) {

	const image = route.params.image

	const viewShotRef = useRef()

    async function captureContent () {
        const imageUri = await viewShotRef.current.capture()
        console.log(imageUri)
		CameraRoll.save(imageUri)
		console.log('THE IMAGE WAS SAVED!!')
		Alert.alert(
			"IMAGEM SALVA",
			"Sua imagem foi salva na galeria!! Vai dar uma olhada!!",
			[
				{ text: "OK", onPress: () => navigation.navigate('Home') }
			]
		)
    }

	//FUNCTION AND VARIABLES TO CHANGE THE FRAME STATE
	const [molduraUri, setMolduraUri] = useState(require('../imgs/m1.png'))

	function mudarMoldura () {
		if (molduraUri == require('../imgs/m1.png')) {
			setMolduraUri(require('../imgs/m2.png'))
		} else if (molduraUri == require('../imgs/m2.png')) {
			setMolduraUri(require('../imgs/m3.png'))
		} else if (molduraUri == require('../imgs/m3.png')) {
			setMolduraUri(require('../imgs/m1.png'))
		}
	} 

	return (
	  <View style={ styles.container }>
		
		<View style={{alignItems: 'flex-start', width: 300,}}>
			<Text style={ styles.text }>SUA IMAGEM:</Text>
		</View>
	  	{/**CONTAINER PARA SALVAR A IMAGEM**/}
		<ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1}}>
			<View style={ styles.containerImagem }>
				{/**IMAGEM PRINCIPAL**/}
				<ImageBackground style={ styles.moldura } source={image}>
					{/**IMAGEM MOLDURA**/}
					<Image style={ styles.imagem } source={molduraUri} />
				</ImageBackground>
			</View>
		</ViewShot>
	  	
		<TouchableOpacity onPress={mudarMoldura} style={ styles.saveButton }>
			<Text style={ styles.text }>ALTERAR MOLDURA</Text>
		</TouchableOpacity>

		<TouchableOpacity onPress={captureContent} style={ styles.saveButton }>
			<Text style={ styles.text }>SALVAR IMAGEM</Text>
		</TouchableOpacity>
	  </View>
	);
}


export default Config;