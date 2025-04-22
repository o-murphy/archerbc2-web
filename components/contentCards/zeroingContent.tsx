import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import {
    FieldEditFloat,
    FieldEditFloatProps,
} from "../fieldsEdit/fieldEditInput";
import ZeroDistanceField from "../fieldsEdit/zeroDistanceField";
import { useHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";
import { ZeroingFloatFields } from "./fiedProps";
import { ThemedIcon } from "../icons/customIcons";
import { useTranslation } from "react-i18next";
import { ToolTipIconButton } from "../iconButtonWithTooltip";
import { ContentTitle } from "./contentTitle";

const ZeroingContent = ({
    onDistancesBtnPress,
}: {
    onDistancesBtnPress?: () => void;
}) => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("zeroingContent.Zeroing")}
                helpKey="ZeroingCard"
            />

            <View style={styles.column}>
                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.zeroX}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.ZeroX")}</Text>
                    </HelpButton>

                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.zeroX as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.click")} />}
                    />
                </View>

                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.zeroY}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.ZeroY")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.zeroY as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.click")} />}
                    />
                </View>

                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroDistanceIdx}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.ZeroDistance")}</Text>
                    </HelpButton>
                    <View
                        style={[
                            styles.row,
                            styles.input,
                            { gap: 8, alignItems: "center" },
                        ]}
                    >
                        <ThemedIcon source="zeroing-distance" size={24} />

                        <ZeroDistanceField style={styles.select} />
                        <ToolTipIconButton
                            tooltip={t("zeroingContent.EditDistances")}
                            style={styles.distancesEditBtn}
                            mode="outlined"
                            icon={"playlist-edit"}
                            onPress={onDistancesBtnPress}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroAirTemperature}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.AirTemperature")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.cZeroAirTemperature as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.°C")} />}
                    />
                </View>

                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroAirPressure}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.AirPressure")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.cZeroAirPressure as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.hPa")} />}
                    />
                </View>

                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroWPitch}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.Pitch")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.cZeroWPitch as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.degree")} />}
                    />
                </View>
                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroPTemperature}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.PowderTemperature")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.cZeroPTemperature as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.degree")} />}
                    />
                </View>
                <View style={styles.row}>
                    <HelpButton
                        helpContent={helpContent.cZeroAirHumidity}
                        style={[styles.label, { alignContent: "center" }]}
                    >
                        <Text>{t("zeroingContent.Humidity")}</Text>
                    </HelpButton>
                    <FieldEditFloat //FIXME float
                        {...(ZeroingFloatFields.cZeroAirHumidity as FieldEditFloatProps)}
                        style={styles.input}
                        right={<TextInput.Affix text={t("measure.%")} />}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // gap: 8,
        maxWidth: 500,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 16,
        marginBottom: 12,
    },
    label: {
        flex: 1,
        alignItems: "flex-start",
    },
    inputContainer: {
        flex: 3,
        flexDirection: "row",
        gap: 8,
    },
    input: {
        flex: 1,
    },
    extraInput: {
        flex: 1, // Ensure extra fields also occupy available space
    },
    sectionTitle: {
        flex: 1,
        marginBottom: 4,
    },
    divider: {
        flex: 3,
    },
    select: {
        flex: 3,
    },
    distancesEditBtn: {
        borderRadius: 4,
        margin: 0,
    },
    column: {
        flex: 1,
    },
});

export default ZeroingContent;
