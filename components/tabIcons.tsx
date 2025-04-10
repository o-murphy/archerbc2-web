// @ts-expect-error: Web-only style, allowed intentionally
import TabRifleD from '../assets/icons/dark/tab-icon-rifle.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabCartridgeD from '../assets/icons/dark/tab-icon-cartridge.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabBulletD from '../assets/icons/dark/tab-icon-bullet.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabDescriptionD from '../assets/icons/dark/tab-icon-description.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabZeroingD from '../assets/icons/dark/tab-icon-zeroing.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabDistancesD from '../assets/icons/dark/tab-icon-distances.png';
// @ts-expect-error: Web-only style, allowed intentionally
import ZeroDistanceD from '../assets/icons/dark/zeroing-dist-icon.png';
//
// @ts-expect-error: Web-only style, allowed intentionally
import TabRifleL from '../assets/icons/light/tab-icon-rifle.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabCartridgeL from '../assets/icons/light/tab-icon-cartridge.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabBulletL from '../assets/icons/light/tab-icon-bullet.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabDescriptionL from '../assets/icons/light/tab-icon-description.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabZeroingL from '../assets/icons/light/tab-icon-zeroing.png';
// @ts-expect-error: Web-only style, allowed intentionally
import TabDistancesL from '../assets/icons/light/tab-icon-distances.png';
// @ts-expect-error: Web-only style, allowed intentionally
import ZeroDistanceL from '../assets/icons/light/zeroing-dist-icon.png';
//
import { Icon, useTheme } from 'react-native-paper';
import { View, ImageSourcePropType } from 'react-native';

// Define the type for icon names to restrict valid keys
export type ThemedIconName = "bullet" | "cartridge" | "description" | "distances" | "rifle" | "zeroing" | "zeroing-distance";

// Icon objects with string paths as values
export const DarkThemeIcon: Record<ThemedIconName, ImageSourcePropType> = {
  "bullet": TabBulletD,
  "cartridge": TabCartridgeD,
  "description": TabDescriptionD,
  "distances": TabDistancesD,
  "rifle": TabRifleD,
  "zeroing": TabZeroingD,
  "zeroing-distance": ZeroDistanceD,
};

export const LightThemeIcon: Record<ThemedIconName, ImageSourcePropType> = {
  "bullet": TabBulletL, // Replace with actual light theme icons
  "cartridge": TabCartridgeL, // Replace with actual light theme icons
  "description": TabDescriptionL, // Replace with actual light theme icons
  "distances": TabDistancesL, // Replace with actual light theme icons
  "rifle": TabRifleL, // Replace with actual light theme icons
  "zeroing": TabZeroingL, // Replace with actual light theme icons
  "zeroing-distance": ZeroDistanceL, // Replace with actual light theme icons
};

// Props for the ThemedTabIcon component
export interface ThemedTabIconProps {
  source: ThemedIconName;
  size: number;
  [key: string]: any; // Allow other props from Icon component, like `color`
}

export const ThemedIcon =({ source, size, ...props }: ThemedTabIconProps) => {
    const theme = useTheme();
    const iconsSet = theme.dark ? DarkThemeIcon : LightThemeIcon;
    const iconSource = iconsSet[source];

    return <Icon source={iconSource} size={size} {...props} />
}

export const ThemedTabIcon = ({ source, size, ...props }: ThemedTabIconProps) => {

  const containerStyle = {
    borderRadius: size,
    // backgroundColor: !theme.dark ? theme.colors.onSurfaceVariant : undefined,
  };

  return (
    <View style={containerStyle}>
        <ThemedIcon source={source} size={size} {...props} />
    </View>
  );
};
