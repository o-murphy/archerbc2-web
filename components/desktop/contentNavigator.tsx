import React from "react";
import RifleContent from "../contentCards/RifleContent";
import DescriptionContent from "../contentCards/DescriptionContent";
import CartridgeContent from "../contentCards/CartridgeContent";
import BulletContent from "../contentCards/BulletContent";
import ZeroingContent from "../contentCards/ZeroingContent";
import DistancesContent from "../contentCards/distancesContent/DistancesContent";

const screens: Record<string, React.ComponentType> = {
    description: DescriptionContent,
    rifle: RifleContent,
    cartridge: CartridgeContent,
    bullet: BulletContent,
    zeroing: ZeroingContent,
    distances: DistancesContent,
};

export type ContentNavigatorProps = {
    route: string;
};

export const ContentNavigator = ({ route }: ContentNavigatorProps) => {
    const Screen = screens[route] ?? DescriptionContent;
    return <Screen />;
};
