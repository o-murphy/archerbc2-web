import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, SegmentedButtons } from "react-native-paper";

const RifleContent = () => {

    const [value, setValue] = useState('right');


    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>
                Rifle
            </Text>

            <View style={styles.row}>
                <Text style={styles.label} >Caliber</Text>
                <TextInput mode="outlined" dense style={styles.input} />
                <Text style={styles.label}>{"inch"}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Rate</Text>
                <TextInput mode="outlined" dense keyboardType="numeric" style={styles.input} />
                <Text style={styles.label}>{"inch/turn"}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Direction</Text>
                <SegmentedButtons style={styles.segmented} onValueChange={value => setValue(value)} value={value}
                    buttons={[
                        {
                            value: 'left',
                            label: 'Left',
                            icon: 'rotate-left'
                        },
                        {
                            value: 'right',
                            label: 'Right',
                            icon: 'rotate-right'
                        },
                    ]}
                />
                <View style={styles.label} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Sight Height</Text>
                <TextInput mode="outlined" dense keyboardType="numeric" style={styles.input} />
                <Text style={styles.label}>{"cm"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: 600,
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
        flex: 1,
    },
    input: {
        flex: 3,
        // height: 24
    },
    segmented: {
        flex: 3,
    }
});

export default RifleContent;
