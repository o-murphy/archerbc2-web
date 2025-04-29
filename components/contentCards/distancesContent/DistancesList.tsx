import { DistanceItemProps, SortableItem } from "./DistanceSortableItem";
import { useEffect, useState, useCallback } from "react";
import { nanoid } from "nanoid";
import {
    DndContext,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
} from "@dnd-kit/sortable";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { ParsedData } from "@/hooks/fileService/useFileParsing";
import { toast } from "@/components/services/toastService/toastService";

export const SortableDistancesList = () => {
    const { currentData, setCurrentData } = useFileContext();
    const [items, setItems] = useState<DistanceItemProps[]>([]);

    const distances = currentData.profile?.distances ?? [];
    const zeroIdx = currentData.profile?.cZeroDistanceIdx ?? 0;

    // Initialize items and update when distances or zeroIdx change
    useEffect(() => {
        const newItems = distances.map((value, index) => ({
            id: nanoid(16),
            value: value / 100,
            zero: zeroIdx === index,
        }));
        setItems(newItems);
    }, [distances, zeroIdx]);

    // Function to update the FileContext with the new order and values
    const updateContext = useCallback((newItems: DistanceItemProps[]) => {
        const newDistances = newItems.map((item) => Math.round(item.value * 100));
        const newZeroIndex = newItems.findIndex((item) => item.zero);
        const adjustedZeroIndex = newZeroIndex >= 0 ? newZeroIndex : 0

        setCurrentData((prev) => ({
            ...prev,
            profile: {
                ...prev.profile,
                distances: newDistances,
                cZeroDistanceIdx: adjustedZeroIndex,
            },
        } as ParsedData));
    }, [setCurrentData]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedItems = arrayMove([...items], oldIndex, newIndex);
        setItems(reorderedItems);
        updateContext(reorderedItems); // Update context after reordering
    };

    const removeItem = (itemToRemove: DistanceItemProps) => {
        const newItems = items.filter(item => item.id !== itemToRemove.id);
        if (newItems.length <= 4) {
            toast.error("distancesContent.MinDistancesCount");
            return;
        }
        setItems(newItems);
        updateContext(newItems); // Update context after removal
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)}>
                {items.map((item) => (
                    <SortableItem key={item.id} item={item} onRemovePress={removeItem} />
                ))}
            </SortableContext>
        </DndContext>
    );
};