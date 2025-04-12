
export enum TwistDir {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export enum BcType {
    G1 = 'G1',
    G7 = 'G7',
    CUSTOM = "CUSTOM"
}

export interface SwitchProps {
    cIdx: number;
    distanceFrom: 'INDEX' | 'VALUE';
    distance: number;
    reticleIdx: number;
    zoom: number;
}

export interface CoefRowProps {
    bccd: number;
    v: number;
}

export interface ProfileProps {
    bDiameter: number;
    bLength: number;
    bWeight: number;
    bcType: BcType;
    bulletName: string;
    cMuzzleVelocity: number;
    cTCoeff: number;
    cZeroAirHumidity: number;
    cZeroAirPressure: number;
    cZeroAirTemperature: number;
    cZeroDistanceIdx: number;
    cZeroPTemperature: number;
    cZeroTemperature: number;
    cZeroWPitch: number;
    caliber: string;
    cartridgeName: string;
    coefRows: CoefRowProps[];
    deviceUuid: string;
    distances: number[];
    profileName: string;
    rTwist: number;
    scHeight: number;
    shortNameBot: string;
    shortNameTop: string;
    switches: SwitchProps[];
    twistDir: TwistDir;
    userNote: string;
    zeroX: number;
    zeroY: number;
}

export interface Payload {
    profile: ProfileProps
} 