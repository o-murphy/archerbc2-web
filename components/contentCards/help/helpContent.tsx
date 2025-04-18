import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { ReactNode } from "react";
import { Text } from "react-native-paper";
import CartridgeHelpContent from "./cartridgeHelp";
import DescriptionHelpContent from "./descriptionHelp";

export const FieldHelp: Partial<Record<keyof ProfileProps | string, ReactNode>> = {

    DescriptionCard: <DescriptionHelpContent />,
    RifleCard: "",
    CartridgeCard: <CartridgeHelpContent />,
    BulletCard: "",
    ZeroingCard: "",

    profileName: (
        <Text variant="bodyMedium">
            The name of the ballistic profile as it appears in the device’s "Rifles" menu.
        </Text>
    ),
    // shortNameTop: <Text variant="bodyMedium">Short caliber label for the icon in the device interface.</Text>,
    // shortNameBot: <Text variant="bodyMedium">Short weight label for the icon in the device interface.</Text>,
    ShortHints: (
        <Text variant="bodyMedium">
            Top is the caliber label for the icon in the device interface.{"\n"}
            Bot is the weight label for the icon in the device interface.
        </Text>
    ),
    cartridgeName: (
        <Text variant="bodyMedium">
            The name of the projectile as it appears in the device’s "Rifles" menu.
        </Text>
    ),
    bulletName: <Text variant="bodyMedium">The name of the bullet.</Text>,
    userNote: <Text variant="bodyMedium">Additional comment.</Text>,

    cMuzzleVelocity: <Text variant="bodyMedium">Muzzle velocity of bullet in mps.</Text>,
    cZeroTemperature: <Text variant="bodyMedium">Temperature at muzzle velocity.</Text>,
    cTCoeff: <Text variant="bodyMedium">Coefficient of powder temperature sensitivity.</Text>,

    bDiameter: "",
    bLength: "",
    bWeight: "",
    bDragModel: "",

    StandardDragModel: "",
    CustomDragModel: "",

    //

    caliber: "",
    rTwist: "",
    twistDir: "",
    scHeight: "",
}
