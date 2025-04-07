import EditDialog from "@/components/openDialog/editDialog";
import StartDialog from "@/components/openDialog/startDialog";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";



const WebLayout = () => {
    return(
        <Surface style={styles.view}>
            <EditDialog />
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