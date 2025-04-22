import React, { ReactNode, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { CommonActions, NavigationContainer, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Surface, Text, useTheme } from 'react-native-paper';
import DescriptionContent from '../contentCards/descriptionContent';
import RifleContent from '../contentCards/rifleContent';
import { ThemedIconName, ThemedTabIcon } from '../icons/customIcons';
import CartridgeContent from '../contentCards/cartridgeContent';
import BulletContent from '../contentCards/bulletContent';
import ZeroingContent from '../contentCards/zeroingContent';
import DistancesContent from '../contentCards/distancesContent';
import { useFileContext } from '@/hooks/fileService/fileContext';
import { TopBar } from './topBar';
import { useTranslation } from 'react-i18next';


const tabs = [
    {
        name: 'sideBar.Description',
        content: DescriptionContent,
        icon: 'description',
    },
    {
        name: 'sideBar.Rifle',
        content: RifleContent,
        icon: 'rifle',
    },
    {
        name: 'sideBar.Cartridge',
        content: CartridgeContent,
        icon: 'cartridge',
    },
    {
        name: 'sideBar.Bullet',
        content: BulletContent,
        icon: 'bullet',
    },
    {
        name: 'sideBar.Zeroing',
        content: ZeroingContent,
        icon: 'zeroing',
    },
    {
        name: 'sideBar.Distances',
        content: DistancesContent,
        icon: 'distances',
    },
];


type TabScreenProps = {
    title: string;
    children: ReactNode;
    route: RouteProp<ParamListBase, string>;
    navigation: NavigationProp<ParamListBase>;
};

const TabScreen = ({ title, children, route, navigation }: TabScreenProps) => {
    const { t } = useTranslation()
    console.log(navigation)


    return (
        <Surface style={styles.tabContainerStyle}>
            <TopBar title={t(title)} />
            {children}
        </Surface>
    )
}

const Tab = createBottomTabNavigator();

export default function EditNav() {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    style={{ height: 100, backgroundColor: theme.colors.elevation.level2 }} // matches your dark theme

                    activeIndicatorStyle={{ height: 48, marginTop: 16 }}

                    labeled={true}
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 40 });
                        }
                        return null;
                    }}
                    getLabelText={({ route }: { route: any }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;
                        return label;
                    }}
                    renderLabel={({ route, focused, color }: { route: any, focused: boolean, color: any }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return (
                            <Text
                                variant="labelSmall"
                                style={{
                                    textAlign: "center",
                                    marginTop: 16,
                                }}
                            >
                                {label}
                            </Text>
                        );
                    }}
                />
            )}
        >
            {tabs.map(({ name, content: Content, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    options={{
                        tabBarLabelPosition: "beside-icon",
                        tabBarLabel: t(name),
                        tabBarIcon: ({ ...props }) => (
                            <ThemedTabIcon source={icon as ThemedIconName} {...props} />
                        ),
                    }}
                >
                    {(props) => (
                        <TabScreen title={name} {...props}>
                            <Content />
                        </TabScreen>
                    )}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    );
}

export const BottomNav = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { currentData } = useFileContext()

    useEffect(() => {
        if (currentData.profile) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [currentData])

    return (
        <Surface style={styles.tabContainerStyle}>
            {visible && (
                <NavigationContainer>
                    <EditNav />
                </NavigationContainer>
            )}
        </Surface>
    )
}


const styles = StyleSheet.create({
    tabContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});