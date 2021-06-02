import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../constants';

const GooglePlacesInput = (props) => {
    const ref = useRef();

    useEffect(() => {
        ref.current?.setAddressText('');
    }, []);

    return (
        <GooglePlacesAutocomplete
            ref={ref}
            placeholderTextColor={'gray'}
            styles={{
                textInputContainer: {
                //   backgroundColor: 'grey',
                },
                textInput: {
                //   height: 38,
                  color: COLORS.dark,
                  fontSize: 16,
                },
                placeholder:{
                    color:'gray'
                },
                predefinedPlacesDescription: {
                  color: 'gray',
                }}}
            // textInput={{color:COLORS.dark}}
            // styles={{textInput:{color:COLORS.dark}}}
            placeholder='Search'
            disableScroll={true}
            onPress={(data, details = null) => {
                // console.log(data, details, "==========================");
                let d = {
                    data, details
                }
                let user = {
                    latitude: details.geometry.location.lat, longitude: details.geometry.location.lng
                }
                // console.log(d, user, "==========================");
                props.onUserLocationInputChange(d, user)
            }}
            fetchDetails={true}
            query={{
                key: 'AIzaSyA9TbU_0fR49nphxckSqawDZFZVh0-qqN4',
                language: 'en',
            }}
        />
    );
};

export default GooglePlacesInput;