import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { getRoutes } from './api/RoutesApi';
import { ListItem } from 'react-native-elements'

export default class RoutesList extends Component {

    state = {
        routesList : [],
        currentRouteItem: null,
    }

    /*onRouteAdded = (ruta) => {
        console.log("Ruta Agregada");
        console.log(ruta);
    }*/
    onRoutesReceived = (routesList) => {
        console.log(routesList);
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
                <View>
                {
                lista.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{l.nombre}</ListItem.Title>
                            <ListItem.Subtitle>{l.tipoRuta}</ListItem.Subtitle>
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
})