import React, { Component } from 'react';
import { 
    ActivityIndicator,
    StyleSheet,
    StatusBar, 
    Text, 
    View, 
    Image, 
    TextInput, 
    TouchableOpacity, 
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import firebase from 'firebase';
import Clipboard from "expo-clipboard";
import uuid from "uuid";
import { Directions } from 'react-native-gesture-handler';

export default class TransactScreen extends Component{

    state = {
        image: null,
        uploading: false,
      };

      async componentDidMount() {
        if (Platform.OS !== "web") {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Habilita los permisos de la cámara");
          }
        }
      }


    render(){
        let { image } = this.state;

        return(
            <View style = {styles.view}>
                <View style={styles.data}>
                    <Text style={styles.datainfo}>Tu Pagobus expira el: DD/MM/YYYY</Text>
                    <Text style={styles.datainfo}>Por favor anexa tu documento para proceder 
                    a la renovación de tu tarjeta PagoBus. De esta forma te evitaras...</Text>
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
                        >  Example: Upload ImagePicker result
                        </Text>
                    )}
                    <TouchableOpacity style={styles.fileSelect} onPress={this._pickImage}>
                        <Text style={{color:'#FFF'}} >Seleccionar archivo...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fileSelect} onPress={this._takePhoto}>
                        <Text style={{color:'#FFF'}} >Tomar foto</Text>
                    </TouchableOpacity>

                    {this._maybeRenderImage()}
                    {this._maybeRenderUploadingOverlay()}
            
                    <StatusBar barStyle="default" />
                </View>
            </View>
        )
    }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
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
    
      _maybeRenderImage = () => {
        let { image } = this.state;
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
            <Text
              onPress={this._copyToClipboard}
              onLongPress={this._share}
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            >
              {image}
            </Text>
          </View>
        );
      };
    
      _share = () => {
        Share.share({
          message: this.state.image,
          title: "Check out this photo",
          url: this.state.image,
        });
      };
    
      _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert("Copied image URL to clipboard");
      };
    
      _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
      };
    
      _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log({ pickerResult });
    
        this._handleImagePicked(pickerResult);
      };
    
      _handleImagePicked = async (pickerResult) => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            this.setState({ image: uploadUrl });
          }
        } catch (e) {
          console.log(e);
          alert("Upload failed, sorry :(");
        } finally {
          this.setState({ uploading: false });
        }
      };
    }
    
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
    
      const ref = firebase.storage().ref().child(uuid.v4());
      const snapshot = await ref.put(blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await snapshot.ref.getDownloadURL();  
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

  // gris claro #BFBFBF
  // gris #404040
  //naranja #EB9142
  //azul #31348F