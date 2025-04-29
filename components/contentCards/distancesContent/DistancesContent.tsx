import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
    distancesTemplates,
} from "@/hooks/fileService/useFileParsing";
import { useHelp } from "../help/helpContent";
import { HelpButton } from "../help/helpIcons";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "../ContentTitle";
import { DistancesTemplateChip } from "./DistancesTemplateChip";
import { SortableDistancesList } from "./DistancesList";


const DistancesContent = () => {
    const { t } = useTranslation();
    const helpContent = useHelp();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ContentTitle
                title={t("distancesContent.Distances")}
                helpKey="DistancesCard"
            />

            <HelpButton helpContent={helpContent.QuickRangeSet}>
                <Text style={{ alignSelf: "center" }} variant="titleMedium">
                    {t("distancesContent.QuickRangeSet")}
                </Text>
            </HelpButton>

            <View
                style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    flexDirection: "row",
                    gap: 8,
                    flexWrap: "wrap",
                }}
            >
                {Object.entries(distancesTemplates).map(([key, distances]) => (
                    <DistancesTemplateChip
                        key={key}
                        name={key}
                        distances={distances}
                    />
                ))}
            </View>

            <ScrollView contentContainerStyle={{ ...styles.container, gap: 8 }}>
                <SortableDistancesList />
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        maxWidth: 500,
    },
});

export default DistancesContent;
