import {Dimensions, StyleSheet} from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      //marginTop: 22,
    },
    buttonText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center',
      //transform: [{ rotate: "-45deg" }],
    },
    modalView: {
      height: windowHeight,
      width: windowWidth,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    square: {
      width: windowWidth * 0.8,
      height: 60,
      backgroundColor: '#FFD600',
      padding: 2,
      margin: 5,
      justifyContent: 'center',
      //transform: [{ rotate: "45deg" }],
      borderColor: 'black',
      borderWidth: 4,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      fontSize: 30,
      color: 'black',
      fontWeight: '400',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });