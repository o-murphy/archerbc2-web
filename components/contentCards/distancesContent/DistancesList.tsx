import { DistanceItemProps, SortableItem } from "./DistanceSortableItem";
import { useEffect, useState, useCallback } from "react";
import { nanoid } from "nanoid";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { ParsedData } from "@/hooks/fileService/useFileParsing";
import { toast } from "@/components/services/toastService/toastService";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";


export const SortableDistancesList = () => {
    const { currentData, setCurrentData } = useFileContext();
    const [items, setItems] = useState<DistanceItemProps[]>([]);

    const distances = currentData.profile?.distances ?? [];
    const zeroIdx = currentData.profile?.cZeroDistanceIdx ?? 0;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        }),
    );

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

        const reorderedItems = arrayMove(items, oldIndex, newIndex);
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
        <ScrollView
            contentContainerStyle={styles.container}
        >
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((item) => (
                        <SortableItem key={item.id} item={item} onRemovePress={removeItem} />
                    ))}
                </SortableContext>
            </DndContext>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        maxWidth: 500,
        gap: 8
    },
});


// FIXME: for grid-like


// import {
//     DndContext,
//     DragEndEvent,
//     DragOverEvent,
//     DragStartEvent,
//     KeyboardSensor,
//     MeasuringStrategy,
//     PointerSensor,
//     useSensor,
//     useSensors,
// } from "@dnd-kit/core";

// export const SortableDistancesList = () => {
//     const { currentData, setCurrentData } = useFileContext();
//     const [items, setItems] = useState<DistanceItemProps[]>([]);
//     const [activeId, setActiveId] = useState<string | null>(null);

//     const distances = currentData.profile?.distances ?? [];
//     const zeroIdx = currentData.profile?.cZeroDistanceIdx ?? 0;

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(KeyboardSensor),
//     );

//     // Initialize items and update when distances or zeroIdx change
//     useEffect(() => {
//         const newItems = distances.map((value, index) => ({
//             id: crypto.randomUUID(),
//             value: value / 100,
//             zero: zeroIdx === index,
//         }));
//         setItems(newItems);
//     }, [distances, zeroIdx]);

//     // Function to update the FileContext with the new order and values
//     const updateContext = useCallback((newItems: DistanceItemProps[]) => {
//         const newDistances = newItems.map((item) => Math.round(item.value * 100));
//         const newZeroIndex = newItems.findIndex((item) => item.zero);
//         const adjustedZeroIndex = newZeroIndex >= 0 ? newZeroIndex : 0;

//         setCurrentData((prev) => ({
//             ...prev,
//             profile: {
//                 ...prev.profile,
//                 distances: newDistances,
//                 cZeroDistanceIdx: adjustedZeroIndex,
//             },
//         } as ParsedData));
//     }, [setCurrentData]);

//     const handleDragStart = (event: DragStartEvent) => {
//         setActiveId(event.active.id);
//     };

//     const handleDragEnd = (event: DragEndEvent) => {
//         const { active, over } = event;
//         setActiveId(null);

//         if (!over || active.id === over.id) {
//             // Update the context with the current local values
//             const updatedItems = items.map(item => {
//                 const inputElement = document.querySelector(`input[value="${item.value}"]`);
//                 if (inputElement) {
//                     const newValue = parseFloat((inputElement as HTMLInputElement).value);
//                     return { ...item, value: newValue };
//                 }
//                 return item;
//             });
//             updateContext(updatedItems);
//             return;
//         }

//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         const reorderedItems = arrayMove(items, oldIndex, newIndex);

//         // Update the context with the new order and the current local values
//         const updatedItems = reorderedItems.map(item => {
//             const inputElement = document.querySelector(`input[value="${item.value}"]`);
//             if (inputElement) {
//                 const newValue = parseFloat((inputElement as HTMLInputElement).value);
//                 return { ...item, value: newValue };
//             }
//             return item;
//         });

//         setItems(updatedItems);
//         updateContext(updatedItems); // Update context after reordering
//     };

//     const handleDragOver = (event: DragOverEvent) => {
//         const { active, over } = event;

//         if (!over || active.id === over.id) {
//             return;
//         }
//     };

//     const removeItem = (itemToRemove: DistanceItemProps) => {
//         const newItems = items.filter(item => item.id !== itemToRemove.id);
//         if (newItems.length <= 4) {
//             toast.error("distancesContent.MinDistancesCount");
//             return;
//         }
//         setItems(newItems);
//         updateContext(newItems); // Update context after removal
//     };

//     return (
//         <ScrollView
//             contentContainerStyle={styles.container}
//         >
//             <DndContext
//                 onDragStart={handleDragStart}
//                 onDragEnd={handleDragEnd}
//                 onDragOver={handleDragOver}
//                 sensors={sensors}
//                 measuring={{ strategy: MeasuringStrategy.Always }}
//             >
//                 <SortableContext items={items.map((item) => item.id)}>
//                     {items.map((item) => (
//                         <SortableItem key={item.id} item={item} onRemovePress={removeItem} />
//                     ))}
//                 </SortableContext>
//             </DndContext>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//         maxWidth: 500,
//         gap: 8,
//         flexWrap: 'wrap', // Enable wrapping
//         flexDirection: 'row',  // Arrange items in a row
//     },
// });