import { isMobileUA } from "@/app/_layout"
import { HelpButton } from "./help/helpIcons"
import { Text } from "react-native-paper"
import { StyleSheet } from "react-native"
import { FieldHelp } from "./help/helpContent"


export const ContentTitle = ({ title, helpKey }: { title: string, helpKey: string }) => {
    return (
        isMobileUA() || (<HelpButton helpContent={FieldHelp()[helpKey]}>
            <Text variant="titleLarge" style={styles.header}>
                {title}
            </Text>
        </HelpButton>)
    )
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 8,
    },
})