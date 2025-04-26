import { NavigationContainer } from '@react-navigation/native';
import EditDialog from './editDialog'; // Your main component


export const SideNav = () => {
    return (
        <NavigationContainer>
            <EditDialog />
        </NavigationContainer>
    );
}
