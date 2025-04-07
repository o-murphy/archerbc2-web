import StartDialog from "@/components/openDialog/startDialog";
import { StyleSheet } from "react-native";
import { Button, Card, Surface, Text } from "react-native-paper";



const WebLayout = () => {
    return(
        <Surface style={styles.view}>
            <StartDialog />
        </Surface>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "column",
    }
})

export default WebLayout;