import { StyleSheet, View } from "react-native";
import { Text, SegmentedButtons, TextInput } from "react-native-paper";
import { FieldEdit, FieldEditFloat, FieldEditFloatProps, FieldEditProps, useProfileFieldState } from "../fieldsEdit/fieldEditInput";
import { Profile, TwistDir } from "a7p-js/dist/types";
import { RifleFloatFields, RifleTextFields } from "./fiedProps";
import { useHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";
import { useTranslation } from "react-i18next";
import { md3PaperIconSource } from "../icons/md3PaperIcons";
import { ContentTitle } from "./contentTitle";


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
                    icon: md3PaperIconSource({ name: "rotate-left", mode: "outline" }),
                },
                {
                    value: TwistDir.RIGHT,
                    label: t('rifleContent.Right'),
                    icon: md3PaperIconSource({ name: "rotate-right", mode: "outline" }),
                },
            ]}
        />
    );
};

const RifleContent = () => {

    const { t } = useTranslation()
    const helpContent = useHelp()

    return (
        <View style={styles.container}>
            <ContentTitle title={t("rifleContent.Rifle")} helpKey="RifleCard" />

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.caliber}
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
                    helpContent={helpContent.rTwist}
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
                    helpContent={helpContent.twistDir}
                    style={[styles.label, { alignContent: "center" }]}
                >
                    <Text>{t("rifleContent.TwistDirection")}</Text>
                </HelpButton>
                <TwistField />
            </View>

            <View style={styles.row}>
                <HelpButton
                    helpContent={helpContent.scHeight}
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
