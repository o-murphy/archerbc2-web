import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import { FieldEdit, FieldEditFloat, FieldEditFloatProps, FieldEditProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { Profile, TwistDir } from "a7p-js/dist/types";
import { RifleFloatFields, RifleTextFields } from "./fiedProps";
import { FieldHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";
import { useTranslation } from "react-i18next";
import { md3PaperIconSource } from "../icons/md3PaperIcons";


const TwistField = () => {
    const { t } = useTranslation()

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
                    label: t('rifleContent.Left'),
                    icon: md3PaperIconSource({name: "rotate-left", mode: "outline"}),
                },
                {
                    value: TwistDir.RIGHT,
                    label: t('rifleContent.Right'),
                    icon: md3PaperIconSource({name: "rotate-right", mode: "outline"}),
                },
            ]}
        />
    );
};

const RifleContent = () => {

    const { t } = useTranslation()

    return (
        <View style={styles.container}>

            <HelpButton helpContent={FieldHelp.RifleCard}>
                <Text variant="titleLarge" style={styles.header}>
                    {t("rifleContent.Rifle")}
                </Text>
            </HelpButton>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.caliber}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.Caliber")}</Text>
                </HelpButton>
                <FieldEdit  //FIXME float
                    {...RifleTextFields.caliber as FieldEditProps}
                    style={styles.input}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.rTwist}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.TwistRate")}</Text>
                </HelpButton>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.rTwist as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.inch_turn")} />}
                />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.twistDir}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.TwistDirection")}</Text>
                </HelpButton>
                <TwistField />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={FieldHelp.scHeight}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.SightHeight")}</Text>
                </HelpButton>
                <FieldEditFloat  //FIXME float
                    {...RifleFloatFields.scHeight as FieldEditFloatProps}
                    style={styles.input}
                    right={<TextInput.Affix text={t("measure.mm")} />}
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
