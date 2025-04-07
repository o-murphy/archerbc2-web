import { StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";

// Type for the navigation handler in the Sidebar component
type SideBarProps = {
    onNavigate: (route: string) => void;
    selectedRoute: string;
};

// Function to render the side drawer with navigation options
const renderSideDrawer = ({ onNavigate, selectedRoute }: SideBarProps) => {
    return (
        <Drawer.Section style={styles.sideBar}>
            <Drawer.CollapsedItem
                label="Profile"
                focusedIcon="card-account-details"
                unfocusedIcon="card-account-details-outline"
                onPress={() => onNavigate?.('profile')}
                active={selectedRoute === 'profile'}
            />
            <Drawer.CollapsedItem
                label="File"
                focusedIcon="file"
                unfocusedIcon="file-outline"
                onPress={() => onNavigate?.('file')}
                active={selectedRoute === 'file'}
            />
            <Drawer.CollapsedItem
                label="Save"
                focusedIcon="content-save"
                unfocusedIcon="content-save-outline"
                onPress={() => onNavigate?.('save')}
                active={selectedRoute === 'save'}
            />
            <Drawer.CollapsedItem
                label="Save All"
                focusedIcon="content-save-all"
                unfocusedIcon="content-save-all-outline"
                onPress={() => onNavigate?.('saveAll')}
                active={selectedRoute === 'saveAll'}
            />
            <Drawer.CollapsedItem
                label="Refresh"
                focusedIcon="file-refresh"
                unfocusedIcon="file-refresh-outline"
                onPress={() => onNavigate?.('refresh')}
                active={selectedRoute === 'refresh'}
            />
            <Drawer.CollapsedItem
                label="Target"
                focusedIcon="crosshairs"
                unfocusedIcon="crosshairs"
                onPress={() => onNavigate?.('target')}
                active={selectedRoute === 'target'}
            />
        </Drawer.Section>
    );
};

export function SideBar({ onNavigate, selectedRoute }: SideBarProps) {
    return renderSideDrawer({ onNavigate, selectedRoute });
}


const styles = StyleSheet.create({
    sideBar: {
        alignItems: "center",
        width: 48,
        borderRadius: 16,
    },
})


export default SideBar;