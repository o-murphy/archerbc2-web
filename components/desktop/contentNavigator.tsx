import RifleContent from "../contentCards/rifleContent";
import DescriptionContent from "../contentCards/descriptionContent";
import CartridgeContent from "../contentCards/cartridgeContent";
import BulletContent from "../contentCards/bulletContent";
import ZeroingContent from "../contentCards/zeroingContent";
import DistancesContent from "../contentCards/distancesContent";
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
            <Stack.Screen
                name="zeroing"
                component={(props: any) => <ZeroingContent {...props} onNavigate={onContentNavigate} />}
            />
            <Stack.Screen name="distances" component={DistancesContent} />
        </Stack.Navigator>
    );
}