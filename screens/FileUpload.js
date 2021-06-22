import React from 'react';

import {
    Container, Header,
    Title,  Content, 
    Body, Button,
    Right, Icon,
    List, ListItem,
    Text,
    Platform,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

const FileUpload = ({navigation}) => {
    const [filesList, setFilesList] = React.useState([])
    // Elegir cualquier tipo de archivo
    async function chooseFile(){
        try {
            const file = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });

        const path = await normalizePath(file.uri)
        const result = await RNFetchBlob.fs.readFile(path, 'base64');
        
        uploadFileToFirebaseStorage(result, file);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
        }
          
    } 
    // Eliminar filePrefix del url de Path
    async function normalizePath(path){
        if(Platform.OS==='ios' || Platform.OS==='android'){
            const filePrefix = 'file://';
            if (path.startsWith(filePrefix)){
                path=path.substring(filePrefix.lenght)
                try {
                    path=decodeURI(path);
                } catch (e){

                }
            } 
        }
        return path;
    } 

    async function uploadFileToFirebaseStorage(result, file){
        const uploadTask = storage()
            .ref(`allFiles/${file.name}`)
            .putString(result, 'base64', {contentType:file.type});

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, 
        function(error) {
            console.log(error);
        }, 
        function() { 
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                saveFileToRealtimeDatabase(downloadURL, file)
                console.log('File available at', downloadURL);
            });
        });
    }

    function saveFileToRealtimeDatabase(downloadURL, file){
        const uniqueKey = database().ref().push().key;
        database().ref(`allFiles/${uniqueKey}`).update({
            fileName: file.name,
            fileType: file.type,
            fileURL: downloadURL,
        })
    }   

    React.useEffect(() => {
        setFilesList([])
        const onChildAdded = database()
        .ref(`allFiles`)
        .on('child_added', (snapshot) => {
            let helperArr = [];
            helperArr.push(snapshot.val());
            setFilesList((files) => [...files, ...helperArr])
            console.log(snapshot.val())
        });
        return () => database().ref(`allFiles`).off('child_added', onChildAdded);
    }, [])

    return (
        <Container>
            <Header>
                <Body style={{ flex:1, alignItems:'center'}}>
                    <Title>Tus archivos</Title>
                </Body>
                <Right style={{flex:0.2}} >
                    <Button transparent onPress={chooseFile} > 
                        <Icon name="cloud-upload" type="MaterialIcons" />
                    </Button>
                </Right>
            </Header>
            <Content>
                {
                    filesList.map((item, index)=>(
                        <List>
                            <ListItem>
                                <Text>{item.fileName}</Text>
                            </ListItem>
                        </List>
                    ))
                }
            </Content>
        </Container>
    );
}