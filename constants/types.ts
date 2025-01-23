import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { ColorValue } from "react-native"

export enum MessageType {
    "fail",
    "success",
    "warning",
    "info",
    "decision",
    "danger",
    "error",
}

export type MessageIconNameType = keyof typeof MaterialCommunityIcons.glyphMap;

export type MessageThemeColorType = ColorValue;

export type AlertProps = {
    open?: boolean;
    onClose: () => void;
    messageType: MessageType;
    headerText: string;
    messageText: string;
    buttonText?: string;
    altButtonText?: string;
    onDismiss?: () => any;
    onProceed?: () => any;
    cancelButtonText?: string;
}