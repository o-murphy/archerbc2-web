import { ReactNode } from "react";
import { Text } from "react-native-paper";
import CartridgeHelpContent from "./cartridgeHelp";
import DescriptionHelpContent from "./descriptionHelp";
import { ProfileProps } from "@/hooks/fileService/useFileParsing";
import { useTranslation } from "react-i18next";

export const useHelp = (): Partial<
    Record<keyof ProfileProps | string, ReactNode>
> => {
    const { t } = useTranslation();

    return {
        DescriptionCard: <DescriptionHelpContent />,
        RifleCard: <></>,
        CartridgeCard: <CartridgeHelpContent />,
        BulletCard: <></>,
        ZeroingCard: <></>,
        DistancesCard: <></>,

        profileName: <Text variant="bodyMedium">{t("help.profileName")}</Text>,
        ShortHints: <Text variant="bodyMedium">{t("help.ShortHints")}</Text>,
        cartridgeName: (
            <Text variant="bodyMedium">{t("help.cartridgeName")}</Text>
        ),
        bulletName: <Text variant="bodyMedium">{t("help.bulletName")}</Text>,
        userNote: <Text variant="bodyMedium">{t("help.userNote")}</Text>,

        cMuzzleVelocity: (
            <Text variant="bodyMedium">{t("help.cMuzzleVelocity")}</Text>
        ),
        cZeroTemperature: (
            <Text variant="bodyMedium">{t("help.cZeroTemperature")}</Text>
        ),
        cTCoeff: <Text variant="bodyMedium">{t("help.cTCoeff")}</Text>,

        bDiameter: <Text variant="bodyMedium">{t("help.bDiameter")}</Text>,
        bLength: <Text variant="bodyMedium">{t("help.bLength")}</Text>,
        bWeight: <Text variant="bodyMedium">{t("help.bWeight")}</Text>,
        DragModel: <Text variant="bodyMedium">{t("help.DragModel")}</Text>,
        StandardDragModel: (
            <Text variant="bodyMedium">{t("help.StandardDragModel")}</Text>
        ),
        CustomDragModel: (
            <Text variant="bodyMedium">{t("help.CustomDragModel")}</Text>
        ),

        caliber: <Text variant="bodyMedium">{t("help.caliber")}</Text>,
        rTwist: <Text variant="bodyMedium">{t("help.rTwist")}</Text>,
        twistDir: <Text variant="bodyMedium">{t("help.twistDir")}</Text>,
        scHeight: <Text variant="bodyMedium">{t("help.scHeight")}</Text>,

        zeroX: <Text variant="bodyMedium">{t("help.zeroX")}</Text>,
        zeroY: <Text variant="bodyMedium">{t("help.zeroY")}</Text>,
        cZeroDistanceIdx: (
            <Text variant="bodyMedium">{t("help.cZeroDistanceIdx")}</Text>
        ),
        cZeroAirTemperature: (
            <Text variant="bodyMedium">{t("help.cZeroAirTemperature")}</Text>
        ),
        cZeroAirPressure: (
            <Text variant="bodyMedium">{t("help.cZeroAirPressure")}</Text>
        ),
        cZeroAirHumidity: (
            <Text variant="bodyMedium">{t("help.cZeroAirHumidity")}</Text>
        ),
        cZeroPTemperature: (
            <Text variant="bodyMedium">{t("help.cZeroPTemperature")}</Text>
        ),
        cZeroWPitch: <Text variant="bodyMedium">{t("help.cZeroWPitch")}</Text>,

        QuickRangeSet: (
            <Text variant="bodyMedium">{t("help.QuickRangeSet")}</Text>
        ),
    };
};
