import { View } from "react-native"
import { DistancesTemplateChip } from "./DistancesTemplateChip"
import { distancesTemplates } from "@/hooks/fileService/useFileParsing"


export const DistancesTemplates = () => {
    return (
        <View
            style={{
                paddingHorizontal: 16,
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
    )
}