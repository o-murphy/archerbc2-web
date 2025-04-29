import { useTranslation } from "react-i18next";
import { md3PaperIconSource } from "../../icons/md3PaperIcons";
import { List, Text } from "react-native-paper";
import { useSortable } from "@dnd-kit/sortable";
import { StyleSheet } from "react-native";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

export interface DistanceItemProps {
    id: string;
    value: number;
    zero: boolean
};


export const SortableItem = ({ item }: { item: DistanceItemProps }) => {
    const { t } = useTranslation();

    const { attributes, listeners, setNodeRef, transform, transition }: any =
        useSortable({ id: item.id });

    // const style = useMemo(() => (
    //     {
    //         backgroundColor: "green",
    //         transform: CSS.Transform.toString(transform),
    //         transition,
    //     }
    // ), [transition, transform]);

    const style = {
        backgroundColor: "green",
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const title = useMemo(() => `${item.value} ${t("measure.m")}`, [item.value])

    return (
        <List.Item
            ref={setNodeRef}
            {...attributes}
            {...listeners}

            elevation={2}
            style={[styles.sortableItem, style]}

            title={title}
            description={
                item.zero && <Text style={styles.descriptionText}>
                    {t("distancesContent.ZeroDistance")}
                </Text>
            }
            left={(props) => <List.Icon icon={"arrow-up-down"} {...props} />}
            right={md3PaperIconSource({ name: "cancel", size: 16 })}
        />
    );
};


const styles = StyleSheet.create({
    descriptionText: {
        textAlign: "center",
        alignSelf: "center",
        fontStyle: "italic"
    },
    sortableItem: {
        flexDirection: "row",
        padding: 16,
        borderRadius: 8,
        gap: 16,

        height: 48,
        marginVertical: 0,
        paddingVertical: 0,
    },
})