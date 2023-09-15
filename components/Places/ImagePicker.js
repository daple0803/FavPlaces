import { View, Alert, Image, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import {
    launchCameraAsync,
    useCameraPermissions,
    PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/color";
import OutlinedButton from "../UI/OutlineButton";

const ImagePicker = ({ onImageTaken }) => {
    const [pickedImage, setPickedImage] = useState("");
    const [cameraPermissionInformation, requestPermission] =
        useCameraPermissions();

    async function verifyPermissions() {
        if (
            cameraPermissionInformation.status === PermissionStatus.UNDETERMINED
        ) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Quyền truy cập bị từ chối",
                "Bạn cần cấp quyền để sử dụng ứng dụng này"
            );

            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.assets[0].uri);
        onImageTaken(image.assets[0].uri);
    }

    let imagePreview = <Text>Chưa có ảnh được chụp</Text>;
    if (pickedImage) {
        imagePreview = (
            <Image style={styles.image} source={{ uri: pickedImage }} />
        );
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
                Chụp ảnh
            </OutlinedButton>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        height: "100%",
        width: "100%",
    },
});
