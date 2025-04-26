import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";


const CartridgeHelpContent = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    description: {
        marginBottom: 20,
    },
    item: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 4,
    },
    text: {
        lineHeight: 20,
        paddingLeft: 16,
    },
});

export default CartridgeHelpContent;
