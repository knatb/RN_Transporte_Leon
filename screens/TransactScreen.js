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

  /*async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Habilita los permisos de la cámara");
      }
    }
  }*/

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
  };

  const _maybeRenderImage = () => {
    let { image } = setImage;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
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
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
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

  return(
    <View style = {styles.view}>
        <View style={styles.data}>
            <Text style={styles.datainfo}>
              FECHA DE VENCIMIENTO dd/MM/yyyy
            </Text>
            <Text style={styles.datainfo}>
              Por favor anexa tu documento para proceder 
              a la renovación de tu tarjeta PagoBus. 
              De esta forma te evitaras...
            </Text>
        </View>
        <View style={styles.fileView}>
            {!!image && (
                <Text
                    style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textAlign: "center",
                    marginHorizontal: 15,
                    }}
                >  {image}
                </Text>
            )}
            <TouchableOpacity style={styles.fileSelect} onPress={_pickImage}>
                <Text style={{color:'#FFF'}} >Seleccionar archivo...</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fileSelect} onPress={_takePhoto}>
                <Text style={{color:'#FFF'}} >Tomar foto</Text>
            </TouchableOpacity>

            {_maybeRenderImage}
            {_maybeRenderUploadingOverlay}
    
            <StatusBar barStyle="default" />
        </View>
    </View>
  )

  async function uploadImageAsync(uri) {
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
    console.log(uploading);

    // We're done with the blob, close and release it
    blob.close();  

    return await snapshot.ref.getDownloadURL();
  }
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: 350
    },
    datainfo:{
        margin: 30
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
    }
});

export default TransactScreen;

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F