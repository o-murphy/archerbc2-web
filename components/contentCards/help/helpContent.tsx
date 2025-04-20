import { ReactNode } from "react";
import { Text } from "react-native-paper";
import CartridgeHelpContent from "./cartridgeHelp";
import DescriptionHelpContent from "./descriptionHelp";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { useTranslation } from "react-i18next";

export const FieldHelp = (): Partial<Record<keyof ProfileProps | string, ReactNode>> => {
  const { t } = useTranslation();

  return {
    DescriptionCard: <DescriptionHelpContent />,
    RifleCard: "",
    CartridgeCard: <CartridgeHelpContent />,
    BulletCard: "",
    ZeroingCard: "",
    DistancesCard: "",

    profileName: <Text variant="bodyMedium">{t("help.profileName")}</Text>,
    ShortHints: <Text variant="bodyMedium">{t("help.ShortHints")}</Text>,
    cartridgeName: <Text variant="bodyMedium">{t("help.cartridgeName")}</Text>,
    bulletName: <Text variant="bodyMedium">{t("help.bulletName")}</Text>,
    userNote: <Text variant="bodyMedium">{t("help.userNote")}</Text>,

    cMuzzleVelocity: <Text variant="bodyMedium">{t("help.cMuzzleVelocity")}</Text>,
    cZeroTemperature: <Text variant="bodyMedium">{t("help.cZeroTemperature")}</Text>,
    cTCoeff: <Text variant="bodyMedium">{t("help.cTCoeff")}</Text>,

    bDiameter: <Text variant="bodyMedium">{t("help.bDiameter")}</Text>,
    bLength: <Text variant="bodyMedium">{t("help.bLength")}</Text>,
    bWeight: <Text variant="bodyMedium">{t("help.bWeight")}</Text>,
    DragModel: <Text variant="bodyMedium">{t("help.DragModel")}</Text>,
    StandardDragModel: <Text variant="bodyMedium">{t("help.StandardDragModel")}</Text>,
    CustomDragModel: <Text variant="bodyMedium">{t("help.CustomDragModel")}</Text>,

    caliber: <Text variant="bodyMedium">{t("help.caliber")}</Text>,
    rTwist: <Text variant="bodyMedium">{t("help.rTwist")}</Text>,
    twistDir: <Text variant="bodyMedium">{t("help.twistDir")}</Text>,
    scHeight: <Text variant="bodyMedium">{t("help.scHeight")}</Text>,

    zeroX: <Text variant="bodyMedium">{t("help.zeroX")}</Text>,
    zeroY: <Text variant="bodyMedium">{t("help.zeroY")}</Text>,
    cZeroDistanceIdx: <Text variant="bodyMedium">{t("help.cZeroDistanceIdx")}</Text>,
    cZeroAirTemperature: <Text variant="bodyMedium">{t("help.cZeroAirTemperature")}</Text>,
    cZeroAirPressure: <Text variant="bodyMedium">{t("help.cZeroAirPressure")}</Text>,
    cZeroAirHumidity: <Text variant="bodyMedium">{t("help.cZeroAirHumidity")}</Text>,
    cZeroPTemperature: <Text variant="bodyMedium">{t("help.cZeroPTemperature")}</Text>,
    cZeroWPitch: <Text variant="bodyMedium">{t("help.cZeroWPitch")}</Text>,

    QuickRangeSet: <Text variant="bodyMedium">{t("help.QuickRangeSet")}</Text>,
  };
};


// import { ProfileProps } from "@/hooks/fileService/useFileParsing";
// import { ReactNode } from "react";
// import { Text } from "react-native-paper";
// import CartridgeHelpContent from "./cartridgeHelp";
// import DescriptionHelpContent from "./descriptionHelp";

// export const FieldHelp: Partial<Record<keyof ProfileProps | string, ReactNode>> = {

//     DescriptionCard: <DescriptionHelpContent />,
//     RifleCard: "",
//     CartridgeCard: <CartridgeHelpContent />,
//     BulletCard: "",
//     ZeroingCard: "",
//     DistancesCard: "",

//     profileName: (
//         <Text variant="bodyMedium">
//             The name of the ballistic profile as it appears in the device’s "Rifles" menu.
//         </Text>
//     ),
//     // shortNameTop: <Text variant="bodyMedium">Short caliber label for the icon in the device interface.</Text>,
//     // shortNameBot: <Text variant="bodyMedium">Short weight label for the icon in the device interface.</Text>,
//     ShortHints: (
//         <Text variant="bodyMedium">
//             Top is the caliber label for the icon in the device interface.{"\n"}
//             Bot is the weight label for the icon in the device interface.
//         </Text>
//     ),
//     cartridgeName: (
//         <Text variant="bodyMedium">
//             The name of the projectile as it appears in the device’s "Rifles" menu.
//         </Text>
//     ),
//     bulletName: <Text variant="bodyMedium">The name of the bullet.</Text>,
//     userNote: <Text variant="bodyMedium">Additional comment.</Text>,

//     cMuzzleVelocity: <Text variant="bodyMedium">Muzzle velocity of bullet in mps.</Text>,
//     cZeroTemperature: <Text variant="bodyMedium">Temperature at muzzle velocity.</Text>,
//     cTCoeff: <Text variant="bodyMedium">Coefficient of powder temperature sensitivity.</Text>,

//     bDiameter: <Text variant="bodyMedium">Bullet diameter in inches</Text>,
//     bLength: <Text variant="bodyMedium">Bullet length in inches</Text>,
//     bWeight: <Text variant="bodyMedium">Bullet weight in grains</Text>,
//     DragModel: <Text variant="bodyMedium">Drag model type. Change between G1, G7 or Custom drag model</Text>,

//     StandardDragModel: <Text variant="bodyMedium">Pairs of Velocity to BC for G1 or G7 standard</Text>,
//     CustomDragModel: <Text variant="bodyMedium">Custom drag table in Mach to Cd</Text>,

//     //

//     caliber: <Text variant="bodyMedium">Caliber name</Text>,
//     rTwist: <Text variant="bodyMedium">Twist in inch/turn</Text>,
//     twistDir: <Text variant="bodyMedium">Twist direction</Text>,
//     scHeight: <Text variant="bodyMedium">Sight height in milimeters</Text>,

//     //

//     zeroX: <Text variant="bodyMedium">Horizontal zeroing in device's clicks</Text>,
//     zeroY: <Text variant="bodyMedium">Vertical zeroing in device's clicks</Text>,
//     cZeroDistanceIdx: <Text variant="bodyMedium">Select zeroing disance from distances list. You can edit distances list in "Distances" tab</Text>,
//     cZeroAirTemperature: <Text variant="bodyMedium">Zeroing atmospheric temperature in °C</Text>,
//     cZeroAirPressure: <Text variant="bodyMedium">Zeroing atmospheric pressure in hPa</Text>,
//     cZeroAirHumidity: <Text variant="bodyMedium">Zeroing atmospheric humidity in %</Text>,
//     cZeroPTemperature: <Text variant="bodyMedium">Zeroing powder temperature in °C</Text>,
//     cZeroWPitch: <Text variant="bodyMedium">Zeroing sight elevation in degrees</Text>,

//     //
//     QuickRangeSet: <Text variant="bodyMedium">Quick change between predefined distances lists</Text>,
// }
