import { IconButton, IconButtonProps, Tooltip } from "react-native-paper"

export interface IconButtonWithToolTipProps extends IconButtonProps {
    tooltip: string
}

export const IconButtonWithToolTip = ({ tooltip, ...props }: IconButtonWithToolTipProps) => {
    return (
        <Tooltip title={tooltip} leaveTouchDelay={0.2}>
            <IconButton {...props} />
        </Tooltip>
    )
}