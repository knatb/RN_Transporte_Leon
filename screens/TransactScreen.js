import React, { useState } from 'react';
import { 
    ActivityIndicator,
    StyleSheet,
    StatusBar, 
    Text, 
    View, 
    Image,
    TouchableOpacity, 
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase';
import Clipboard from "expo-clipboard";
import { Directions } from 'react-native-gesture-handler';

const TransactScreen = ({route}) => {
  
  const {data, userUID} = route.params;
  const [venc, setVenc] = useState(data.fechavencimiento);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
    return(
      <View></View>
    );
  };

  const _maybeRenderImage = () => {
    //let { image } = image;
    if (!image) {
      return(
        <View>
          <Text>No hay imagen seleccionada</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          marginTop: 30,
          marginBottom: 15,
          width: 200,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 100, height: 150 }} />
        </View>
      </View>
    );
  };

  const _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    _handleImagePicked(pickerResult);
  };

  const _pickImage = async () => {
    try{
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 16],
        });
        console.log({ pickerResult });        
        _handleImagePicked(pickerResult);
        
      } catch(error){
        console.log(error)
      }
    
  };

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };  

  const  uploadImageAsync = async(uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileName = uri.substring(uri.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(`${userUID}/${fileName}`);

    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();  

    return await snapshot.ref.getDownloadURL();
  }

  return(

    <View style = {styles.view}>
        <Text style={styles.titulos}>RENOVAR</Text>
        <View style={styles.data}>
            <Text style={styles.titulos2}>
              Su documento se anexó por última vez el: {venc}
            </Text>
            <Text style={styles.datainfo}>
              Por favor anexa tu documento para proceder 
              a la renovación de tu tarjeta PagoBus. 
              De esta forma te seguiras teniendo acceso
              a los servicios de Transporte León
            </Text>
        </View>
        <View style={styles.fileView}>
            {!!image && _maybeRenderImage()}
            <TouchableOpacity style={styles.fileSelect} onPress={_pickImage}>
                <Text style={{color:'#FFF'}} >Seleccionar archivo...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fileSelect} onPress={_takePhoto}>
                <Text style={{color:'#FFF'}} >Tomar foto</Text>
            </TouchableOpacity>
            
            {_maybeRenderUploadingOverlay()}

            <StatusBar barStyle="default" />
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    data: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 350
    },
    datainfo:{
        margin: 30,
        textAlign: 'justify'
    },
    fileView:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: 300,
        width: 300,
        backgroundColor: '#BFBFBF',
        borderRadius: 20,
        marginBottom: 150
    },
    fileSelect:{
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#404040',
        height: 30,
        padding: 10,
        textAlign: 'center',
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    titulos: {
      color: '#000000',
      backgroundColor: '#f6901e',
      borderColor: '#EB9142',
      fontWeight: 'normal',
      fontSize: 24,
      marginTop: 5,
      marginBottom: 15,
      height: 50,
      width:'100%',
      padding: 10,
      textAlign:'center',
      fontFamily:'sans-serif'
  },
  titulos2: {
    color: '#000000',
    borderColor: '#EB9142',
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15,
    height: 80,
    padding: 10,
    textAlign:'center',
    fontFamily:'sans-serif'
  },
});

export default TransactScreen;

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F