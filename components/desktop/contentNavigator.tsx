import RifleContent from "../contentCards/RifleContent";
import DescriptionContent from "../contentCards/DescriptionContent";
import CartridgeContent from "../contentCards/CartridgeContent";
import BulletContent from "../contentCards/BulletContent";
import ZeroingContent from "../contentCards/ZeroingContent";
import DistancesContent from "../contentCards/distancesContent/DistancesContent";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export type ContentNavigatorProps = {
    onContentNavigate: (routeName: string) => void;
};

export const ContentNavigator = ({ onContentNavigate }: ContentNavigatorProps) => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // You're using your own TopBar
                cardStyle: {
                    backgroundColor: "transparent"
                }
            }}
            initialRouteName="description"
        >
            <Stack.Screen name="description" component={DescriptionContent} />
            <Stack.Screen name="rifle" component={RifleContent} />
            <Stack.Screen name="cartridge" component={CartridgeContent} />
            <Stack.Screen name="bullet" component={BulletContent} />
            <Stack.Screen name="zeroing" component={ZeroingContent} />
            <Stack.Screen name="distances" component={DistancesContent} />
        </Stack.Navigator>
    );
}