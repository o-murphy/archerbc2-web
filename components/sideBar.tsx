import { StyleSheet } from "react-native";
import { Drawer, Icon } from "react-native-paper";
// import { useAssets } from 'expo-asset';
// import { Image }from 'expo-image';

import TabRifleIcon from '../assets/icons/tab-icon-rifle.png';
import TabCartridgeIcon from '../assets/icons/tab-icon-cartridge.png';
import TabBulletIcon from '../assets/icons/tab-icon-bullet.png';
import TabDescriptionIcon from '../assets/icons/tab-icon-description.png';
import TabZeroingIcon from '../assets/icons/tab-icon-zeroing.png';
import TabDistancesIcon from '../assets/icons/tab-icon-distances.png';

const drawerItems = [
    { label: 'Description', icon: TabDescriptionIcon, route: 'description' },
    { label: 'Rifle', icon: TabRifleIcon, route: 'rifle' },
    { label: 'Cartridge', icon: TabCartridgeIcon, route: 'cartridge' },
    { label: 'Bullet', icon: TabBulletIcon, route: 'bullet' },
    { label: 'Zeroing', icon: TabZeroingIcon, route: 'zeroing' },
    { label: 'Distances', icon: TabDistancesIcon, route: 'distances' },
];

// Type for the navigation handler in the Sidebar component
type SideBarProps = {
    onNavigate: (route: string) => void;
    selectedRoute: string;
};


// Function to render the side drawer with navigation options
const renderSideDrawer = ({ onNavigate, selectedRoute }: SideBarProps) => (
    <Drawer.Section style={styles.sideBar}>
        {drawerItems.map(({ label, icon, route }) => (
            <Drawer.CollapsedItem
                key={route}
                style={styles.collapsedItem}
                label={label}
                focusedIcon={() => <Icon source={icon} size={40} />}
                unfocusedIcon={() => <Icon source={icon} size={40} />}
                onPress={() => onNavigate?.(route)}
                active={selectedRoute === route}
            />
        ))}
    </Drawer.Section>
);

export function SideBar({ onNavigate, selectedRoute }: SideBarProps) {
    return renderSideDrawer({ onNavigate, selectedRoute });
}


const styles = StyleSheet.create({
    sideBar: {
        alignItems: "center",
        width: 64,
        borderRadius: 16,
    },
    collapsedItem: {
        width: 64,
        height: 48,
        borderRadius: 16,
    }
})


export default SideBar;