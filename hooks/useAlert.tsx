import { useState } from "react";
import {
    MessageType,
    AlertProps
  } from "@/constants/types";

const useAlert = () => {
    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState<MessageType>(MessageType.info);
    const [headerText, setHeaderText] = useState("");
    const [messageText, setMessageText] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [altButtonText, setAltButtonText] = useState("");
    const [cancelButtonText, setCancelButtonText] = useState("Cancel");
    const [onDismiss, setOnDismiss] = useState<() => any>(() => {});
    const [onProceed, setOnProceed] = useState<() => any>(() => {});

    const openAlert = (props: Partial<AlertProps>) => {
        setOpen(true);
        props.messageType? setMessageType(props.messageType): setMessageType(MessageType.info);
        props.headerText? setHeaderText(props.headerText): setHeaderText("");
        props.messageText? setMessageText(props.messageText): setMessageText("");
        props.buttonText? setButtonText(props.buttonText): setButtonText("");
        props.altButtonText? setAltButtonText(props.altButtonText): setAltButtonText("");
        props.cancelButtonText? setCancelButtonText(props.cancelButtonText): setCancelButtonText("Cancel");
        props.onDismiss? setOnDismiss(() => props.onDismiss): setOnDismiss(() => {});
        props.onProceed? setOnProceed(() => props.onProceed): setOnProceed(() => {});
    };

    const closeAlert = () => {
        setOpen(false);
    };

    const alertModalState = {
        open,
        onClose : closeAlert,
        messageType,
        headerText,
        messageText,
        buttonText,
        altButtonText,
        cancelButtonText,
        onDismiss: onDismiss,
        onProceed: onProceed,
    }

    return { alertModalState, openAlert, closeAlert};
};

export default useAlert;