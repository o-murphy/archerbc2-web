import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import { FieldEdit, FieldEditFloat, FieldEditFloatProps, FieldEditProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { Profile, TwistDir } from "a7p-js/dist/types";
import { RifleFloatFields, RifleTextFields } from "./fiedProps";
import { FieldHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";


const TwistField = () => {
    const [twistDir, setTwistDir] = useProfileFieldState<keyof Profile, TwistDir>({
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

            <HelpButton helpContent={FieldHelp.RifleCard}>
                <Text variant="titleLarge" style={styles.header}>
                    Rifle
                </Text>
            </HelpButton>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.caliber}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{"Caliber"}</Text>
                </HelpButton>
                <FieldEdit  //FIXME float
                    {...RifleTextFields.caliber as FieldEditProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"inch"} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.rTwist}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{"Twist Rate"}</Text>
                </HelpButton>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.rTwist as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"inch/turn"} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.twistDir}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{"Twist Direction"}</Text>
                </HelpButton>
                <TwistField />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.scHeight}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{"Sight Height"}</Text>
                </HelpButton>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.scHeight as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={"mm"} />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 8,
        maxWidth: 500,
    },
    header: {
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 32,
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
