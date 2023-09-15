import { useCallback, useState } from "react";
import { ScrollView, TextInput, Text, View, StyleSheet } from "react-native";

import { Place } from "../../models/places";
import { Colors } from "../../constants/color";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

const PlaceForm = ({ onCreatePlace }) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleText(enteredTitle) {
        setEnteredTitle(enteredTitle);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        const placeData = new Place(
            enteredTitle,
            selectedImage,
            pickedLocation
        );
        onCreatePlace(placeData);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleText}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onImageTaken={takeImageHandler} />
            <LocationPicker onPickLocation ={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Lưu địa điểm</Button>
        </ScrollView>
    );
};

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary500 },
    input: {
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 4,
        paddingVertical: 6,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});
