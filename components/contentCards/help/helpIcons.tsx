import { help } from "@/components/helpDialog/helpService"
import { ReactNode } from "react"
import { StyleSheet } from "react-native"
import { Pressable, TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Button, ButtonProps, Icon, IconButton, Text, TextInput, TextProps, useTheme } from "react-native-paper"

export const getHelpInputIcon = (helpText: ReactNode) => {
    const theme = useTheme()
    return (
        <TextInput.Icon
            size={16}
            style={{ width: 24, height: 24, padding: 0, margin: 0 }}
            icon="help-circle-outline"
            color={theme.colors.tertiaryContainer}
            onPress={() => help.show(helpText)}
        />
    )
}

export const getHelpIcon = (helpText: ReactNode) => {
    const theme = useTheme()
    return (
        <IconButton
            size={16}
            style={{ width: 24, height: 24, padding: 0, marginHorizontal: 8 }}
            icon="help-circle-outline"
            iconColor={theme.colors.tertiaryContainer}
            onPress={() => help.show(helpText)}
        />
    )
}

type HelpButtonProps = {
    helpContent: ReactNode
} & TouchableOpacityProps

export const HelpButton: React.FC<HelpButtonProps> = ({ helpContent, children, ...props }) => {
    const theme = useTheme()

    return (
        <TouchableOpacity onPress={() => help.show(helpContent)} style={props.style}>
            <View style={[styles.container, props.style]}>
                <Icon
                    {...props}
                    source="help-circle-outline"
                    color={theme.colors.tertiaryContainer}
                    size={16}
                />
                {children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-start', // Align children to the left
        justifyContent: 'flex-start', // Optional: ensures items are left-aligned
    },
})