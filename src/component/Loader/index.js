import React from 'react'
import { StyleSheet,ActivityIndicator, Text, View } from 'react-native'

const Loader = () => {
    return (
        <View style={styles.container}>
           <ActivityIndicator size={100} color={COLORS.primary} />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.4)',
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    }
})
