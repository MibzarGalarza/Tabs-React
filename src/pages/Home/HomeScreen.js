import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';


const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello! 🙋🏻‍♂️</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20
    }
});

export default HomeScreen;
