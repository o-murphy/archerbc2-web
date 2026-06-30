import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Surface, Text, useTheme } from "react-native-paper";
import { ThemedIconName, ThemedTabIcon } from "../icons/customIcons";
import { useFileContext } from "@/hooks/fileService/fileContext";
import { TopBar } from "@/components/mobile/topBar";
import { useTranslation } from "react-i18next";
import DescriptionContent from "@/components/contentCards/DescriptionContent";
import RifleContent from "@/components/contentCards/RifleContent";
import CartridgeContent from "@/components/contentCards/CartridgeContent";
import BulletContent from "@/components/contentCards/BulletContent";
import ZeroingContent from "@/components/contentCards/ZeroingContent";
import DistancesContent from "@/components/contentCards/distancesContent/DistancesContent";


const tabs = [
    {
        name: "sideBar.Description",
        content: DescriptionContent,
        helpContentKey: "DescriptionCard",
        icon: "description",
        checkFields: ["profileName", "shortNameTop", "shortNameBot", "cartridgeName", "bulletName", "userNote"]
    },
    {
        name: "sideBar.Rifle",
        content: RifleContent,
        helpContentKey: "RifleCard",
        icon: "rifle",
        checkFields: ["caliber", "rTwist", "scHeight", "twistDir"]
    },
    {
        name: "sideBar.Cartridge",
        content: CartridgeContent,
        helpContentKey: "CartridgeCard",
        icon: "cartridge",
        checkFields: ["cMuzzleVelocity", "cZeroTemperature", "cTCoeff"]
    },
    {
        name: "sideBar.Bullet",
        content: BulletContent,
        helpContentKey: "BulletCard",
        icon: "bullet",
        checkFields: ["bLength", "bWeight", "bDiameter", "bcType", "coefRows", "coefRowsG1", "coefRowsG7", "coefRowsCustom"]
    },
    {
        name: "sideBar.Zeroing",
        content: ZeroingContent,
        helpContentKey: "ZeroingCard",
        icon: "zeroing",
        checkFields: ["cZeroPTemperature", "cZeroAirTemperature", "cZeroAirHumidity", "cZeroAirPressure", "cZeroWPitch", "zeroX", "zeroY", "cZeroDistanceIdx"]
    },
    {
        name: "sideBar.Distances",
        content: DistancesContent,
        helpContentKey: "DistancesCard",
        icon: "distances",
        checkFields: ["distances"]
    },
];

type Route = { key: string; title: string };

const EditNav = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);

    const routes: Route[] = useMemo(
        () => tabs.map(({ name }) => ({ key: name, title: t(name) })),
        [t]
    );

    const renderScene = ({ route }: { route: Route }) => {
        const tab = tabs.find((tab) => tab.name === route.key);
        if (!tab) return null;
        const Content = tab.content;
        return (
            <Surface style={styles.sceneStyle}>
                <TopBar title={t(tab.name)} helpContentKey={tab.helpContentKey} />
                <Content />
            </Surface>
        );
    };

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{
                height: 100,
                backgroundColor: theme.colors.elevation.level2,
            }}
            activeIndicatorStyle={{ height: 48, marginTop: 16 }}
            labeled={true}
            renderIcon={({ route }) => {
                const tab = tabs.find((tab) => tab.name === route.key);
                if (!tab) return null;
                return <ThemedTabIcon source={tab.icon as ThemedIconName} size={40} />;
            }}
            renderLabel={({ route }) => (
                <Text variant="labelSmall" style={styles.tabLabel}>
                    {route.title}
                </Text>
            )}
        />
    );
};

export const BottomNav = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { currentData } = useFileContext();

    useEffect(() => {
        setVisible(!!currentData.profile);
    }, [currentData]);

    return (
        <Surface style={styles.containerStyle}>
            {visible && <EditNav />}
        </Surface>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
    },
    sceneStyle: {
        flex: 1,
    },
    tabLabel: {
        textAlign: "center",
        marginTop: 16,
    },
});
