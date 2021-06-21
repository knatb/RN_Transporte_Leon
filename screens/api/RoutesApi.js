import firebase from 'firebase'

export async function getRoutes(routesRetreived){
    var routesList = [];

    var snapshot = await firebase.firestore()
    .collection('autobuses')
    .get()
    
    snapshot.forEach((doc) => {
        routesList.push(doc.data());
    });

    routesRetreived(routesList);
}