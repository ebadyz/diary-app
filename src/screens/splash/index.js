import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Splash = () => {
    return(
        <View style={styles.container}>
            <Text>Dear Diary</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1ed760'
    }
})

export default Splash