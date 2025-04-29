import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { ParsedData } from "@/hooks/fileService/useFileParsing";
import { toast } from "@/components/services/toastService/toastService";
import { nanoid } from "nanoid";
import { DistanceItemProps } from "./DistanceSortableItem";

export const LightweightDistancesList = () => {
    const { currentData, setCurrentData } = useFileContext();
    const [items, setItems] = useState<DistanceItemProps[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const distances = currentData.profile?.distances ?? [];
    const zeroIdx = currentData.profile?.cZeroDistanceIdx ?? 0;

    useEffect(() => {
        const newItems = distances.map((value, index) => ({
            id: nanoid(16),
            value: value / 100,
            zero: index === zeroIdx,
        }));
        setItems(newItems);
    }, [distances, zeroIdx]);

    const updateContext = useCallback((newItems: DistanceItemProps[]) => {
        const newDistances = newItems.map(item => Math.round(item.value * 100));
        const newZeroIdx = newItems.findIndex(item => item.zero);
        setCurrentData(prev => ({
            ...prev,
            profile: {
                ...prev.profile,
                distances: newDistances,
                cZeroDistanceIdx: newZeroIdx >= 0 ? newZeroIdx : 0,
            },
        } as ParsedData));
    }, [setCurrentData]);

    const handlePress = (id: string) => {
        if (selectedId === null) {
            setSelectedId(id);
        } else if (selectedId === id) {
            setSelectedId(null); // unselect if pressed again
        } else {
            // swap items
            const firstIndex = items.findIndex(i => i.id === selectedId);
            const secondIndex = items.findIndex(i => i.id === id);
            const newItems = [...items];
            [newItems[firstIndex], newItems[secondIndex]] = [newItems[secondIndex], newItems[firstIndex]];
            setItems(newItems);
            updateContext(newItems);
            setSelectedId(null);
        }
    };

    const removeItem = (itemToRemove: DistanceItemProps) => {
        const newItems = items.filter(item => item.id !== itemToRemove.id);
        if (newItems.length <= 4) {
            toast.error("distancesContent.MinDistancesCount");
            return;
        }
        setItems(newItems);
        updateContext(newItems);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {items.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        styles.item,
                        item.id === selectedId && styles.selected,
                        item.zero && styles.zero,
                    ]}
                    onPress={() => handlePress(item.id)}
                    onLongPress={() => removeItem(item)}
                >
                    <Text>{item.value} m</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        padding: 16,
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        margin: 4,
    },
    selected: {
        backgroundColor: "#d0ebff",
        borderColor: "#339af0",
    },
    zero: {
        borderColor: "green",
        borderWidth: 2,
    },
});