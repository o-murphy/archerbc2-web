import { ScrollView, StyleSheet, View } from "react-native";
import { Badge, Drawer, useTheme } from "react-native-paper";
import { ThemedIconName, ThemedTabIcon } from "../icons/customIcons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { useFileContext } from "@/hooks/fileService/fileContext";

const drawerItems = [
    {
        label: "Description",
        icon: "description",
        route: "description",
        checkFields: ["profileName", "shortNameTop", "shortNameBot", "cartridgeName", "bulletName", "userNote"]
    },
    {
        label: "Rifle",
        icon: "rifle",
        route: "rifle",
        checkFields: ["caliber", "rTwist", "scHeight", "twistDir"]
    },
    {
        label: "Cartridge",
        icon: "cartridge",
        route: "cartridge",
        checkFields: ["cMuzzleVelocity", "cZeroTemperature", "cTCoeff"]
    },
    {
        label: "Bullet",
        icon: "bullet",
        route: "bullet",
        checkFields: ["bLength", "bWeight", "bDiameter", "bcType", "coefRows", "coefRowsG1", "coefRowsG7", "coefRowsCustom"]
    },
    {
        label: "Zeroing",
        icon: "zeroing",
        route: "zeroing",
        checkFields: ["cZeroPTemperature", "cZeroAirTemperature", "cZeroAirHumidity", "cZeroAirPressure", "cZeroWPitch", "zeroX", "zeroY", "cZeroDistanceIdx"]
    },
    {
        label: "Distances",
        icon: "distances",
        route: "distances",
        checkFields: ["distances"]
    },
];

// Type for the navigation handler in the Sidebar component
type SideBarProps = {
    onNavigate: (route: string) => void;
    selectedRoute: string;
};

const TabIconWithErrorBadge = ({ source, checkFields }: { source: ThemedIconName, checkFields: (keyof ProfileProps)[] }) => {
    const [badgeVisible, setBadgeVisible] = useState<boolean>(false);
    const { fieldErrors } = useFileContext();
    const theme = useTheme()

    useEffect(() => {
        if (checkFields && checkFields.length > 0) {
            const hasErrors = checkFields.some(
                field => fieldErrors[field] === true
            );
            setBadgeVisible(hasErrors);
        } else {
            setBadgeVisible(false);
        }
    }, [checkFields, fieldErrors]);

    return (
        <View>
            <ThemedTabIcon
                source={source}
                size={40}
            />
            <Badge
                style={styles.badge}
                size={16}
                visible={badgeVisible}
                theme={{
                    colors: {
                        error: theme.colors.errorContainer
                    }
                }}
            />
        </View>
    );
};

export function SideBar({ onNavigate, selectedRoute }: SideBarProps) {
    const { t } = useTranslation();

    return (
        <Drawer.Section style={styles.sideBar}>
            <ScrollView contentContainerStyle={styles.sideBar}>
                {drawerItems.map(({ label, icon, route, checkFields }) => (
                    <Drawer.CollapsedItem
                        key={route}
                        style={styles.collapsedItem}
                        label={t(`sideBar.${label}`)}
                        focusedIcon={() => (
                            <TabIconWithErrorBadge
                                source={icon as ThemedIconName}
                                checkFields={checkFields as (keyof ProfileProps)[] || []}
                            />
                        )}
                        unfocusedIcon={() => (
                            <TabIconWithErrorBadge
                                source={icon as ThemedIconName}
                                checkFields={checkFields as (keyof ProfileProps)[] || []}
                            />
                        )}
                        onPress={() => onNavigate?.(route)}
                        active={selectedRoute === route}
                    />
                ))}
            </ScrollView>
        </Drawer.Section>
    );
}

const styles = StyleSheet.create({
    sideBar: {
        alignItems: "center",
        width: 80,
        borderRadius: 16,
    },
    collapsedItem: {
        width: 64,
        height: 48,
        borderRadius: 16,
    },
    badge: {
        position: 'absolute',
        top: 4,
        right: 0,
        borderWidth: 2,
        borderColor: "white"
    },
});

export default SideBar;
