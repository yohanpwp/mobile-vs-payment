import { View, Text, Modal, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useTranslation } from "react-i18next";

const UploadModal = ({
  modalVisible,
  onClose,
  isLoading = false,
}: {
  modalVisible: boolean;
  onClose: () => void;
  isLoading?: boolean;
}) => {
  const { setPropsValue } = useGlobalContext();
  const [ disabled, setDisabled ] = useState<boolean>(false);
  const { t } = useTranslation();

  const uploadImage = async (mode: string) => {
    try {
      setDisabled(true);
      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
          base64: true,
        });
        if (!result.canceled) {
          // Save image
          saveImage(result.assets[0]);
        }
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
          base64: true,
        });
        if (!result.canceled) {
          // Save image
          saveImage(result.assets[0]);
        }
      }
    } catch (error) {
      console.log("Error uploading image: ", error);
    } finally {
      setDisabled(false);
    }
  };

  const saveImage = async (image: any) => {
    try {
      setPropsValue({profileImage: image});
      onClose();
    } catch (error) {
      console.log("Error saving image: ", error);
    }
  };

  const removeImage = () => {
    setPropsValue({image: null});
    onClose();
  }

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <Pressable className="flex-1 bg-[#41414186]" onPress={onClose}>
        {isLoading && (
          <ActivityIndicator size={70} color={Colors.light.background} />
        )}
        {!isLoading && (
          <View className="flex-1 justify-center items-center">
            <View className="w-[350px] bg-white rounded-2xl p-8 shadow-xl justify-center items-center">
              <Text className="text-bold text-2xl">{t('Profile Photo')}</Text>
              <View className="flex-row justify-center items-center w-full">
                <Pressable
                  className="mt-4 w-[80px] p-3 bg-gray-400 rounded-xl items-center active:bg-yellow-100"
                  onPress={() => uploadImage('camera')}
                  disabled={disabled}
                >
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{t('Camera')}</Text>
                </Pressable>
                <Pressable
                  className="mt-4 mx-4 w-[80px] p-3 bg-gray-400 rounded-xl justify-center items-center active:bg-yellow-100"
                  onPress={() => uploadImage('gallery')}
                  disabled={disabled}
                >
                  <MaterialCommunityIcons
                    name="view-gallery-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{t('Gallery')}</Text>
                </Pressable>
                <Pressable
                  className="mt-4 w-[80px] p-3 bg-gray-400 rounded-xl items-center active:bg-yellow-100"
                  onPress={() => removeImage()}
                  disabled={disabled}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{t('Remove')}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default UploadModal;
