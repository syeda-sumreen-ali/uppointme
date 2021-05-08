import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	View,
	Image,
	TextInput,
	Dimensions,
	TouchableHighlight,
	ActivityIndicator,
	BackHandler,
	DeviceEventEmitter,
	Platform,
	SafeAreaView,
	ScrollView,
	FlatList
} from 'react-native';
// import MyStatusBar from '../../container/statusBar';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
// import ICONS from '../../constants/icons'
import { connect } from 'react-redux';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geolocation from '@react-native-community/geolocation';
// import { searchMenuAction } from '../../store/actions/searchAction';
import GooglePlacesInput from './googlePlacesInput';
import { COLORS, ICONS } from '../../constants';
// import { locationSave } from '../../store/actions/authActions';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let INITIAL_MAP_REGION = {};

export class Map extends Component {
    state={
        userLocation: this.props.location|| '',
        region: {
            latitude: null,
            longitude: null,
            latitudeDelta: 0.04,
            longitudeDelta: 0.5,
        },
    }

    geoSuccess = (position) => {
		// console.log(position);
		INITIAL_MAP_REGION = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			latitudeDelta: 0.015,
			longitudeDelta: 0.0121,
		};
		this.setState({
			userLocation: {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			},
			region: INITIAL_MAP_REGION,
		},()=>this.props.setLocation( {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }));
	};
	geoErr = (err) => {
		if (err.PERMISSION_DENIED === 1) {
			return alert('App need to access your location please grant permission');
		}
		// console.log('Error finding location trying again: ', err);
		// let geoConfig = {
		//   enableHighAccuracy: true,
		//   timeout: 50000,
		//   maximumAge: 50000,
		// };
		// Geolocation.getCurrentPosition(this.geoSuccess, this.geoErr, geoConfig);
	};

	Geolocation = () => {
		if (Platform.OS === "android") {
			LocationServicesDialogBox.checkLocationServicesIsEnabled({
				message:
					'<h2>Use Location? </h2> Uppointme wants to access your location',
				ok: 'YES',
				cancel: 'NO',
				enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
				showDialog: true, // false => Opens the Location access page directly
				openLocationServices: true, // false => Directly catch method is called if location services are turned off
				preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
				preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
				providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
			})
				.then(
					function (success) {
						// success => {alreadyEnabled: true, enabled: true, status: "enabled"}
						Geolocation.getCurrentPosition(
							(position) => {
								console.log(position);

								INITIAL_MAP_REGION = {
									latitude: position.coords.latitude,
									longitude: position.coords.longitude,
									latitudeDelta: 0.015,
									longitudeDelta: 0.0121,
								};
								this.setState({
									userLocation: {
										latitude: position.coords.latitude,
										longitude: position.coords.longitude,
									},
									region: INITIAL_MAP_REGION,
								},()=>this.props.setLocation({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                }));
							},
							(error) => console.log("ERRORRRR",error),
							{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
						);
					}.bind(this),
				)
				.catch((error) => {
					console.log(error.message);
				});

			BackHandler.addEventListener('hardwareBackPress', () => {
				//(optional) you can use it if you need it
				LocationServicesDialogBox.forceCloseDialog();
			});

			DeviceEventEmitter.addListener('locationProviderStatusChange', function (
				status,
			) {
				// only trigger when "providerListener" is enabled
				// console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
			});
		}
	};

	static getDerivedStateFromProps=(props,state)=>{
		if(props.location.latitude){
			return{
				userLocation:props.location,
				region:{
					latitude:props.location.latitude,
				longitude: props.location.longitude,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121,
				}
			}
		}else{
			return null
		}

	}

  
    componentDidMount() {
      
    !this.props.location?()=> this.Geolocation():this.setState({
			region: {
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121,
			},
			userLocation: {
				latitude: this.props.location.latitude,
				longitude: this.props.location.longitude
			}})
	}
    componentWillUnmount() {
		// used only when "providerListener" is enabled
		if (Platform.OS === "android") {
			LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
		}
	}
    onUserLocationInputChange = (data, user) => {
		let region = {
			latitude: user.latitude,
			longitude: user.longitude,
			latitudeDelta: 0.02,
			longitudeDelta: 0.02,
		}
		// INITIAL_MAP_REGION = region
		this.setState({ userLocation: user, region },()=>this.props.setLocation(user))
		console.log(" onUserLocationInputChange","region",region)
		// this.props.locationSave(region);

	}
    SwitchToUserCurrentLocation = () => {
		this.setState({
			region: INITIAL_MAP_REGION,
			userLocation: INITIAL_MAP_REGION
		},()=>this.props.setLocation(INITIAL_MAP_REGION))
	}
    onRegionChange = (region) => {
		// console.log(region)
		this.setState({
			region: region,
			// userLocation: {
			//   latitude: region.lat,
			//   longitude: region.lng,
			// }
		});
		// console.log(region);

	};
    render() {
        
		const {userLocation,region} = this.state;
        console.log("userLocation:",userLocation)
		console.log("this.propsss", this.props.location)
		console.log("region",this.state.region)
        return (
            <View>
                {/* <MyStatusBar backgroundColor="#ffffff" barStyle="dark-content" /> */}
                <View
						style={[
							styles._map,
							{
								height: 290,
								width: '100%',
								alignItems: 'center',
								justifyContent: 'center',
								// marginTop: "20.5%",
								zIndex: 200,
								// marginRight: '2.5%',
								backgroundColor: COLORS.light,
								elevation: 2,
								borderColor: "#ccc"
							},
						]}>

						{(userLocation.latitude && userLocation.longitude)||(this.props.location) ? (
							<View
								style={[
									// styles._map,
									{
										// marginLeft: '5%',
										height: '100%',
										width: '100%',
										alignItems: 'center',
										justifyContent: 'center',
										alignSelf: 'center',

										backgroundColor: COLORS.light,
									},
								]}>
								<View style={{
									position: "absolute",
									top: 15,
									borderColor: "#ccc",
									// borderWidth: 2,
									elevation: 10, right: 30, left: 30, zIndex: 100, flex: 1
								}}>
									<GooglePlacesInput 
                                    onUserLocationInputChange={(d, u) => this.onUserLocationInputChange(d, u)} />

								</View>

								<MapView
									provider={PROVIDER_GOOGLE} // remove if not using Google Maps
									style={styles.map}
									region={region}
									// onRegionChange={() => this.onRegionChange()}
								// onRegionChange={(val) =>this.onRegionChange(val)}
								>

								
									{userLocation.latitude && (
										<Marker
											onDragEnd={(e) => this.onUserLocationInputChange(e.nativeEvent, { latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
											draggable={true}
											title={'My location'}
											coordinate={{
												latitude: userLocation.latitude || this.props.location.latitude,
												longitude: userLocation.longitude ||this.props.location.longitude,
											}}
											pinColor={'#2196F3'}></Marker>
									)}

								</MapView>

								<TouchableHighlight
									style={{
										backgroundColor: '#fff',
										padding: '3%',
										elevation: 6,
										justifyContent: 'center',
										alignItems: 'center',
										borderRadius: 100,
										alignSelf: 'flex-end',
										position: 'absolute',
										bottom: 6,
										right: 10,
									}}
									onPress={() => 
										this.setState({ region: INITIAL_MAP_REGION },
                                            ()=> this.Geolocation() 
                                )
                                    
                                       
                                        // ,
									}>
									<ICONS.MaterialIcons
										name="my-location"
										color="black"
										size={25}
									/>
								</TouchableHighlight>
							</View>
						) : (
								<TouchableOpacity
									style={{
										flex: 1,
										width: '100%',
										justifyContent: 'center',
										alignItems: 'center',
										// marginLeft: "8%",
										marginBottom: "5%"

										// backgroundColor: 'pink',
									}}
									onPress={() => {
										// console.log('activity indicator press');
										this.Geolocation();
									}}>
									<ActivityIndicator color={COLORS.primary} size={45} />
								</TouchableOpacity>
							)}
					</View>
			
            </View>
        )
    }
}

export default Map

const styles = StyleSheet.create({
    _map: {
		...StyleSheet.absoluteFillObject,
      
		height:windowHeight *0.6,
		width: 400,
		justifyContent: 'flex-end',
		alignItems: 'center',
        // marginBottom:200
	},
	map: {
		...StyleSheet.absoluteFillObject,
        
	},
})
