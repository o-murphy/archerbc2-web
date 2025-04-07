import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";

const RifleContent = () => {
    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>
                Rifle Settings
            </Text>

            <View style={styles.row}>
                <Text style={styles.label}>Caliber</Text>
                <TextInput mode="outlined" dense style={styles.input} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Rate (inch/turn)</Text>
                <TextInput mode="outlined" dense keyboardType="numeric" style={styles.input} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Direction</Text>
                <TextInput mode="outlined" dense style={styles.input} placeholder="Right / Left" />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Scope Height (cm)</Text>
                <TextInput mode="outlined" dense keyboardType="numeric" style={styles.input} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: 500, // Optional: widen container for better alignment
    },
    header: {
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
    },
    input: {
        width: "60%",
        height: 32
    },
});

export default RifleContent;
