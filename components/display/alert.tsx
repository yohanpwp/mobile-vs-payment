import { View, Text, Modal, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { useTranslation } from "react-i18next";
import {
  MessageType,
  MessageIconNameType,
  MessageThemeColorType,
  AlertProps,
} from "@/constants/types";

const MyAlert = ({
  open = false,
  onClose,
  messageType,
  headerText,
  messageText,
  buttonText,
  altButtonText,
  onDismiss,
  onProceed,
  cancelButtonText = "Cancel",
}: AlertProps) => {
  const [messageIconName, setMessageIconName] =
    useState<MessageIconNameType>("alert-circle");
  const [messageThemeColor, setMessageThemeColor] =
    useState<MessageThemeColorType>("red");
  const { t } = useTranslation();

  useEffect(() => {
    setAlertType(messageType);
  }, [messageType]);

  const setAlertType = (type: MessageType) => {
    switch (messageType) {
      case MessageType.fail:
        setMessageIconName("alert-circle");
        setMessageThemeColor("red");
        break;
      case MessageType.success:
        setMessageIconName("check-circle");
        setMessageThemeColor("green");
        break;
      case MessageType.warning:
        setMessageIconName("alert-rhombus");
        setMessageThemeColor("orange");
        break;
      case MessageType.decision:
        setMessageIconName("account-alert-outline");
        setMessageThemeColor("orange");
        break;
      case MessageType.error:
        setMessageIconName("alert-circle");
        setMessageThemeColor("red");
        break;
      case MessageType.info:
        setMessageIconName("information-outline");
        setMessageThemeColor("blue");
        break;
      case MessageType.danger:
        setMessageIconName("alert-circle-check-outline");
        setMessageThemeColor("red");
        break;
      default:
    }
  };

  const handleProceed = () => {
    onProceed ? onProceed() : onClose();
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={open}>
      <Pressable
        className="flex-1 justify-center items-center bg-[#41414186]"
        onPress={onClose}
      >
        <View className="bg-white dark:bg-gray-400 min-w-72 p-8 rounded-3xl shadow-lg justify-center items-center mx-6">
          <View
            className={`absolute -top-10 self-center p-4 rounded-full shadow-slate-600 shadow-sm `}
            style={{ backgroundColor: messageThemeColor }}
          >
            <MaterialCommunityIcons
              name={messageIconName}
              size={60}
              color="white"
            />
          </View>
          <View className="mt-10">
            <Text className="text-xl font-semibold">{headerText}</Text>
          </View>
          <Text>{messageText}</Text>
          <View className="flex-row gap-4 mt-4">
            <Pressable
              onPress={() => handleProceed()}
              className={`bg-blue-600 rounded-xl min-h-[50px] justify-center items-center px-4 w-full`}
              style={{ backgroundColor: messageThemeColor }}
            >
              <Text className="text-white text-xl">{t('OK')}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default MyAlert;
