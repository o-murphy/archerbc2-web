import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Surface, Appbar } from 'react-native-paper';
import { md3PaperIconSource } from '../icons/md3PaperIcons';
import DescriptionContent from '../contentCards/descriptionContent';
import RifleContent from '../contentCards/rifleContent';
import { ThemedTabIcon } from '../icons/customIcons';
import CartridgeContent from '../contentCards/cartridgeContent';
import BulletContent from '../contentCards/bulletContent';
import ZeroingContent from '../contentCards/zeroingContent';
import DistancesContent from '../contentCards/distancesContent';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import { useTranslation } from 'react-i18next';


const Tab = createBottomTabNavigator();




const TopBar = ({ title }: {title: string}) => {
    const { theme, toggleTheme } = useThemeToggle()
    const themeIcon = md3PaperIconSource({ name: theme.dark ? "dark-mode" : "light-mode" });

    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState<'en' | 'ua'>(() => i18n.language === 'ua' ? 'ua' : 'en');
    const translateIcon = md3PaperIconSource({ name: "translate" })

    const toggleLanguage = async () => {
        const newLang = currentLang === 'en' ? 'ua' : 'en';
        await i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
            <Appbar.Action icon={themeIcon} onPress={toggleTheme} />
            <Appbar.Action icon={translateIcon} onPress={toggleLanguage} />
        </Appbar.Header>
    );
}

export default function MyComponent() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
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
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return label;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Description"
                // component={DescriptionScreen}
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Description"} />
                        <DescriptionContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Description',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='description' size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Rifle"
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Rifle"} />
                        <RifleContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Rifle',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='rifle' size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Cartridge"
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Cartridge"} />

                        <CartridgeContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Cartridge',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='cartridge' size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Bullet"
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Bullet"} />

                        <BulletContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Bullet',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='bullet' size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Zeroing"
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Zeroing"} />
                        <ZeroingContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Zeroing',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='zeroing' size={size} color={color} />
                    },
                }}
            />
            <Tab.Screen
                name="Distances"
                component={
                    () => (<Surface style={styles.tabContainerStyle} >
                        <TopBar title={"Distances"} />
                        <DistancesContent />
                    </Surface>)
                }
                options={{
                    tabBarLabel: 'Distances',
                    tabBarIcon: ({ color, size }) => {
                        return <ThemedTabIcon source='distances' size={size} color={color} />
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export const BottomNav = () => {
    return (
        <NavigationContainer>
            <MyComponent />
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    tabContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    }
});