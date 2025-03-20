import React, { useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//Screens
import HomeScreen from "./src/pages/Home/HomeScreen";


const AppStackNavigator = createNativeStackNavigator();
const StackHome = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


function TabNavigator() {
    return (
        <Tab.Navigator
            // Usamos nuestro custom tabBar para controlar la distribución dinámica
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Books':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'Chat':
                            iconName = focused ? 'chat' : 'chat-outline';
                            break;
                        case 'Shop':
                            iconName = focused ? 'shopping' : 'shopping-outline';
                            break;
                    }
                    return (
                        <AnimatedTabIcon
                            focused={focused}
                            iconName={iconName}
                            label={route.name}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={MyStackHome} />
            <Tab.Screen name="Books" component={MyStackHome} />
            <Tab.Screen name="Chat" component={MyStackHome} />
            <Tab.Screen name="Shop" component={MyStackHome} />
        </Tab.Navigator>
    );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const focused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Asigna mayor flex al botón seleccionado para que ocupe más espacio
                const flexValue = focused ? 2 : 1;

                return (
                    <TouchableWithoutFeedback key={route.key} onPress={onPress}>
                        <View style={[styles.tabItem, { flex: flexValue }]}>
                            {options.tabBarIcon({ focused })}
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </View>
    );
};

const AnimatedTabIcon = ({ focused, iconName, label }) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(scaleAnim, {
            toValue: focused ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [focused]);

    return (
        <Animated.View
            style={[
                styles.animatedButton,
                {
                    justifyContent: focused ? 'flex-start' : 'center',
                    paddingHorizontal: focused ? 3 : 0,
                    width: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 110], // Se expande a 100 al estar enfocado
                    }),
                },
            ]}
        >
            <View style={focused && [{ backgroundColor: "#70AADF", borderRadius: 100, padding: 5 }]}>
                <MaterialCommunityIcons name={iconName} size={25} color={focused ? '#FFF' : '#000'} />
            </View>
            {focused && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}
        </Animated.View>
    );
};


function MyStackHome() {

    return (
        <StackHome.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                headerTintColor: "#FFF", // Color del texto/iconos del header
                headerStyle: {
                    shadowOpacity: 0, // Elimina la sombra
                    elevation: 0, // Elimina la elevación en Android
                },
            }}
        >
            <StackHome.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: "Welcome Developer 👋🏻",
                    gestureEnabled: false, // Desactiva el gesto de retroceso en iOS
                    headerShown: true,
                    headerTitleAlign: "center", // Centra el título
                    headerTitleStyle: {
                        fontFamily: "Poppins_600SemiBold",
                        color: "#000", // Cambia el color del título
                    },
                })}
            />
        </StackHome.Navigator>
    );
}


function MyStack() {

    return (
        <AppStackNavigator.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                headerTintColor: "#FFF", // Color del texto/iconos del header
                headerStyle: {
                    shadowOpacity: 0, // Elimina la sombra
                    elevation: 0, // Elimina la elevación en Android
                },
            }}
        >
            <AppStackNavigator.Screen
                name="HomeScreen"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </AppStackNavigator.Navigator>
    )
}


export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 5,
        borderRadius: 100,
        backgroundColor: '#000',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        overflow: 'hidden', // Evita que se corte el contenido
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    animatedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 40,
        overflow: 'hidden', // Permite ver el botón completo sin que se corte el fondo blanco
    },
    label: {
        marginLeft: 5,
        color: '#000',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 11,
    },
});