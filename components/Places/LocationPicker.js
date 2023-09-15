import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import {
    useNavigation,
    useRoute,
    useIsFocused,
} from "@react-navigation/native";

import OutlinedButton from "../UI/OutlineButton";
import { Colors } from "../../constants/color";
import { getMapPreview, getAddress } from "../../util/location";

function LocationPicker({ onPickLocation }) {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng,
            };
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({ ...pickedLocation, address: address });
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (
            locationPermissionInformation.status ===
            PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Quyền truy cập bị từ chối",
                "Bạn cần cấp quyền để sử dụng ứng dụng này"
            );

            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let locationPreview = <Text>Bạn chưa chọn địa điểm trên bản đồ</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Vị trí của bạn
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Chọn trên bản đồ
                </OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
    },
});
