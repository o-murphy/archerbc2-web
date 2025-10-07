import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import EditDialog from './editDialog'; // Your main component


export const SideNav = () => {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <EditDialog />
            </NavigationContainer>
        </NavigationIndependentTree>

    );
}
