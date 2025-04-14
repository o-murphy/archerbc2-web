import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import { FieldEdit, FieldEditFloat, FieldEditFloatProps, FieldEditProps, FieldFloatProps, FieldProps, useFileField } from "../fieldsEdit/fieldEditInput";
import { Profile, TwistDir } from "@/utils/a7p/types";


const RifleTextFields: FieldProps = {
    caliber: {
        field: "caliber",
        maxLength: 50,
    },
};

const RifleFloatFields: FieldFloatProps = {
    rTwist: {
        field: "rTwist",
        range: { min: -50, max: 50 },
        multiplier: 100,
        fraction: 2,
    },
    scHeight: {
        field: "scHeight",
        range: { min: 0, max: 100 },
        multiplier: 1,
        fraction: 0,
    },
};

const TwistField = () => {
    const [twistDir, setTwistDir] = useFileField<keyof Profile, TwistDir>({
        field: 'twistDir',
        defaultValue: TwistDir.RIGHT,
    });

    return (
        <SegmentedButtons
            style={styles.segmented}
            onValueChange={(value) => setTwistDir(value as TwistDir)}
            value={twistDir}
            buttons={[
                {
                    value: TwistDir.LEFT,
                    label: 'Left',
                    icon: 'rotate-left',
                },
                {
                    value: TwistDir.RIGHT,
                    label: 'Right',
                    icon: 'rotate-right',
                },
            ]}
        />
    );
};

const RifleContent = () => {

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>
                Rifle
            </Text>

            <View style={styles.row}>
                <Text style={styles.label} >Caliber</Text>
                <FieldEdit  //FIXME float
                    {...RifleTextFields.caliber as FieldEditProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"inch"} />}
                />
                <View style={styles.label} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Rate</Text>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.rTwist as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"inch/turn"} />}
                />
                <View style={styles.label} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Twist Direction</Text>
                <TwistField />
                <View style={styles.label} />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Sight Height</Text>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.scHeight as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"mm"} />}
                />
                <View style={styles.label} />
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
        justifyContent: "flex-start",
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
    },
    segmented: {
        flex: 3,
    }
});

export default RifleContent;
