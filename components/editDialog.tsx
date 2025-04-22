import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Dialog, Surface, Text, useTheme } from "react-native-paper";
import SideBar from "./sideBar";
import TopBar from "./desktop/topBar";
import RifleContent from "./contentCards/rifleContent";
import DescriptionContent from "./contentCards/descriptionContent";
import CartridgeContent from "./contentCards/cartridgeContent";
import BulletContent from "./contentCards/bulletContent";
import ZeroingContent from "./contentCards/zeroingContent";
import DistancesContent from "./contentCards/distancesContent";
import { useFileContext } from "@/hooks/fileService/fileContext";


// Type for dialog dimensions
type DialogDimensions = {
    dialogWidth: number;
    dialogHeight: number;
};

// Function to calculate dialog width and height based on window dimensions
const calculateDialogDimensions = (): DialogDimensions => {
    const { width, height } = Dimensions.get('window');

    const dialogWidth = width < 1024 ? (width < 1024 ? width : 720) : 1024;
    const dialogHeight = height < 720 ? (height < 720 ? height : 540) : 720;

    return { dialogWidth, dialogHeight };
};

const routeContentMap: Record<string, React.FC> = {
    description: DescriptionContent,
    rifle: RifleContent,
    cartridge: CartridgeContent,
    bullet: BulletContent,
    zeroing: ZeroingContent,
    distances: DistancesContent,
};

const EditDialog = () => {

    // State with TypeScript annotations
    const [dialogDimensions, setDialogDimensions] = useState<DialogDimensions>(calculateDialogDimensions());
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedRoute, setSelectedRoute] = useState<string>('description');

    const { currentData } = useFileContext()

    useEffect(() => {
        if (currentData.profile) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [currentData])

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

    const renderContent = () => {
        if (selectedRoute === 'zeroing') {
            return <ZeroingContent onDistancesBtnPress={() => handleNavigate('distances')} />
        }
        const ContentComponent = routeContentMap[selectedRoute];
        return ContentComponent ? <ContentComponent /> : <Text>Unknown</Text>;
    };
    const closeDialog = () => {
        // setVisible(false)  // Optional functionality for closing dialog
    };

    return (
        <Dialog
            visible={visible}
            dismissable={false}
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
                {/* @ts-expect-error: Web-only style, allowed intentionally */}
                <Surface style={[styles.surfaceContent, webSurfaceOverflow]}>
                    {renderContent()}
                </Surface>

            </Dialog.Content>
        </Dialog>
    );
};

const webSurfaceOverflow = {
    // // @ts-expect-error: Web-only style, allowed intentionally
    overflow: "auto"
}

const styles = StyleSheet.create({

    surfaceContent: {
        flex: 1,
        marginLeft: 16,
        height: "100%",
        borderRadius: 16,
        padding: 24,
    },
    dialog: {
        width: 1024,
        height: 720,
        alignSelf: "center",
    },
    dialogTitle: {
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 16,
    },
    dialogContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",  // important to allow vertical growth
        borderRadius: 16,
    },
});

export default EditDialog;
