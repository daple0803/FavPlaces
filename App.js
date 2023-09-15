import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { useEffect, useState } from "react";
import { Colors } from "./constants/color";
import Map from "./screens/Map";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();
export default function App() {
    const [dbInitialized, setDbInitialized] = useState(false);

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        init()
            .then(() => {
                setDbInitialized(true);
                SplashScreen.hideAsync();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!dbInitialized) {
        return null;
    }

    return (
        <>
            <StatusBar />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Colors.primary500,
                        },
                        headerTintColor: Colors.gray700,
                        contentStyle: { backgroundColor: Colors.gray700 },
                    }}>
                    <Stack.Screen
                        name="AllPlaces"
                        component={AllPlaces}
                        options={({ navigation }) => ({
                            title: "Danh sách địa điểm",
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon="add"
                                    size={24}
                                    color={tintColor}
                                    onPress={() => {
                                        navigation.navigate("AddPlace");
                                    }}
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="AddPlace"
                        component={AddPlace}
                        options={{
                            title: "Danh sách địa điểm",
                        }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={Map}
                        options={{
                            title: "Bản đồ",
                        }}
                    />
                    <Stack.Screen
                        name="PlaceDetails"
                        component={PlaceDetails}
                        options={{
                            title: "Đang tải địa điểm",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
