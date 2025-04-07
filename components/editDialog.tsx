import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Dialog, Portal, Surface, Text } from "react-native-paper";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import RifleContent from "./rifleContent";
import DescriptionContent from "./descriptionContent";


// Type for dialog dimensions
type DialogDimensions = {
    dialogWidth: number;
    dialogHeight: number;
};

// Function to calculate dialog width and height based on window dimensions
const calculateDialogDimensions = (): DialogDimensions => {
    const { width, height } = Dimensions.get('window');

    const dialogWidth = width < 800 ? (width < 800 ? width : 700) : 800;
    const dialogHeight = height < 600 ? (height < 600 ? height : 500) : 600;

    return { dialogWidth, dialogHeight };
};

const routeContentMap: Record<string, React.ReactNode> = {
    description: <DescriptionContent />,
    rifle: <RifleContent/>,
    cartridge: <Text>cartridge</Text>,
    bullet: <Text>bullet</Text>,
    zeroing: <Text>zeroing</Text>,
    distances: <Text>distances</Text>,
  };

const EditDialog = () => {
    // State with TypeScript annotations
    const [dialogDimensions, setDialogDimensions] = useState<DialogDimensions>(calculateDialogDimensions());
    const [visible, setVisible] = useState<boolean>(true);
    const [selectedRoute, setSelectedRoute] = useState<string>('description');

    useEffect(() => {
        const handleResize = () => {
            const newDimensions = calculateDialogDimensions();  // Recalculate width and height on resize
            setDialogDimensions(newDimensions);
        };

        // Add event listener for screen resizing
        const subscription = Dimensions.addEventListener('change', handleResize);

        // Cleanup the event listener
        return () => subscription.remove();  // Automatically cleans up when component unmounts
    }, []);  // Empty dependency array ensures this only runs once on mount

    const handleNavigate = (route: string) => {
        console.log('Navigate to:', route);
        setSelectedRoute(route);
    };

    const renderContent = () => routeContentMap[selectedRoute] ?? <Text>Unknown</Text>;

    const closeDialog = () => {
        // setVisible(false)  // Optional functionality for closing dialog
    };

    return (
        <Portal>
            <Dialog
                visible={visible}
                style={[
                    styles.dialog,
                    {
                        width: dialogDimensions.dialogWidth,  // Dynamically set width
                        height: dialogDimensions.dialogHeight  // Dynamically set height
                    }
                ]}
                onDismiss={closeDialog}
            >
                <Dialog.Title style={styles.dialogTitle}>
                    <TopBar />
                </Dialog.Title>

                <Dialog.Content style={styles.dialogContent}>
                    <SideBar onNavigate={handleNavigate} selectedRoute={selectedRoute} />
                    <Surface style={styles.surfaceContent}>
                        {renderContent()}
                    </Surface>
                    
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    surfaceContent: {
        flex: 1,
        marginLeft: 16,
        height: "100%",
        borderRadius: 16,
        // justifyContent: "center",
        // alignItems: "center",
        padding: 24
    },
    dialog: {
        minWidth: 720,
        width: 800,
        height: 600,
        alignSelf: "center",
    },
    dialogTitle: {
        justifyContent: "center",
    },
    dialogContent: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
    },
});

export default EditDialog;
