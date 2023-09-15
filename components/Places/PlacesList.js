import { StyleSheet, FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
    const navigation = useNavigation();

    function selectedPlaceHandler(id) {
        navigation.navigate("PlaceDetails", { placeId: id });
    }

    if (!places || !places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    Hiện chưa có địa điểm nào
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PlaceItem place={item} onSelect={selectedPlaceHandler} />
            )}
        />
    );
};

export default PlacesList;

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
});
