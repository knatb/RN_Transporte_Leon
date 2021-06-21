import react, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    FlatList,
    SafeAreaView
} from 'react-native';
import { getRoutes } from './api/RoutesApi';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { Divider } from 'react-native-elements/dist/divider/Divider';

class RoutesList extends Component {

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
        this.setState(prevstate => ({
            routesList: prevState.routesList = routesList
        }));
    }
    componentDidMount(){
        getRoutes(onRoutesReceived); 
    }

    render(){
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.routesList}
                    ItemSeparatorComponent={() => <Divider style={{ backgroundColor:'black' }}/>}
                    keyExtractor={(item, index) =>  index.toString()}
                    renderItem={({item}) => {
                        console.log(item);
                        return (
                            <ListItem
                                title={item.nombre}
                                subtitle={item.tipoRuta}
                                
                            />
                        )
                    }}
                />

            </SafeAreaView>
        );
    }
}
