import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {requestLocationPermission} from '../../utils/locationService';

const Map = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function getLocation() {
      const coordinates = await requestLocationPermission();
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXx",coordinates)
      setLocation(coordinates);
    }

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        /// initialRegion={location}
        />
        {/* </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map;
