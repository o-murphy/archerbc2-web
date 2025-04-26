import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Chip, Surface, Icon } from "react-native-paper";
import { useMemo, useRef } from "react";
import {
    useProfileFields,
    useProfileFieldState,
} from "../fieldsEdit/fieldEditInput";
import { nanoid } from "nanoid";

import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ThemedIcon } from "../icons/customIcons";
import {
    distancesTemplates,
    ProfileProps,
} from "@/hooks/fileService/useFileParsing";
import { useHelp } from "./help/helpContent";
import { HelpButton } from "./help/helpIcons";
import { useTranslation } from "react-i18next";
import { ContentTitle } from "./contentTitle";

type DistanceItem = { id: string; value: number; zero: boolean };


const SortableItem = ({ item }: { item: DistanceItem }) => {
    const { t } = useTranslation();

    const { attributes, listeners, setNodeRef, transform, transition }: any =
        useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Surface
            elevation={2}
            ref={setNodeRef}
            style={[styles.sortableItem, style]}
            {...attributes}
            {...listeners}
        >
            <Icon source={"arrow-up-down"} size={24} />
            <Text style={{ textAlign: "center", alignSelf: "center" }}>
                {item.value} {t("measure.m")}
            </Text>
            {item.zero && <ThemedIcon size={24} source="zeroing-distance" />}
        </Surface>
    );
};

const DistancesList = () => {
    const [profileFields, setProfileFields] = useProfileFields([
        "cZeroDistanceIdx",
        "distances",
    ]);

    const value = profileFields.distances ?? [];
    const zeroIdx = profileFields.cZeroDistanceIdx ?? 0;

    const idMapRef = useRef<Map<number, string>>(new Map());

    const sensors = useSensors(useSensor(PointerSensor));

    const items = useMemo(() => {
        return value.map((val, index) => {
            if (!idMapRef.current.has(val)) {
                idMapRef.current.set(val, nanoid());
            }

            return {
                id: idMapRef.current.get(val)!,
                value: val / 100,
                zero: zeroIdx === index,
            };
        });
    }, [value, zeroIdx]);

    const setItems = (items: DistanceItem[]) => {
        const newZeroIndex = items.findIndex((item) => item.zero);
        const newValues = items.map((item) => Math.round(item.value * 100));

        setProfileFields({
            cZeroDistanceIdx: newZeroIndex,
            distances: newValues,
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        setItems(reorderedItems);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={item.id} item={item} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

const DistancesTemplateChip = ({
    name,
    distances,
}: {
    name: string;
    distances: number[];
}) => {
    const { t } = useTranslation();

    const [, setValue] = useProfileFieldState<keyof ProfileProps, number[]>({
        field: "distances",
        defaultValue: [],
    });

    const onPress = () => {
        setValue(distances.map((item) => Math.round(item * 100)));
    };

    return (
        // <Chip mode="flat" onPress={onPress}>{t("distanceTemplate." + name)}</Chip>
        <Chip mode="flat" onPress={onPress}>
            {name}
        </Chip>
    );
};

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
                <DistancesList />
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
    sortableItem: {
        flexDirection: "row",
        padding: 16,
        borderRadius: 8,
        gap: 16,
    },
});

export default DistancesContent;
