import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -8.0448238, longitude: -34.8829916 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/2254731?s=400&v=4' }} />

        <Callout>
          <View style={styles.callout}>
            <Text style={styles.devName}>Diego Fernandes</Text>
            <Text style={styles.devBio}>CTO na @Rocketseat. Apaixonado pelas melhores tecnologias de desenvolvimento web e mobile.</Text>
            <Text style={styles.devTechs}>React.js, React Native, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView >
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 250
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },

  devBio: {
    color: '#666',
    marginTop: 5
  },

  devTechs: {
    marginTop: 5
  }
})

export default Main;