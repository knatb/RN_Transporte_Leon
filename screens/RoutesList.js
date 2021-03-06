import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { getRoutes } from './api/RoutesApi';
import { ListItem } from 'react-native-elements'

export default class RoutesList extends Component {

    state = {
        routesList : [],
        currentRouteItem: null,
    }
    
    onRoutesReceived = (routesList) => {
        //console.log(routesList);
        this.setState(prevState => ({
            routesList: prevState.routesList = routesList
        }));
    }
    
    componentDidMount(){
        getRoutes(this.onRoutesReceived); 
    }

    render(){
        const lista = this.state.routesList;

        return (        
            <ScrollView style={styles.container}>
                <Text style={styles.inputs}>LISTADO DE RUTAS</Text>
                <View>
                {
                lista.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{l.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{l.tipoRuta}</ListItem.Subtitle>
                            <View style={styles.subtitleView}>
                            <Text style={styles.ratingText}>Recorrido: {l.recorrido} km</Text>
                        </View>
                        </ListItem.Content>
                        </ListItem>
                    ))
                }
                </View>
            </ScrollView> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    subtitleView: {
        flexDirection: 'row',
        paddingTop: 5
    },
    ratingText: {
        color: 'grey'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 100,
        height:50
    },
    inputs: {
        color: '#000000',
        backgroundColor: '#f6901e',
        borderColor: '#f6901e',
        fontWeight: 'normal',
        fontSize: 24,
        marginTop: 5,
        marginBottom: 15,
        height: 50,
        padding: 10,
        textAlign:'center',
        fontFamily:'sans-serif'
    },
})