import { View, Text, Image, Pressable } from "react-native";
import React, {useState} from "react";
import { ImageSourcePropType } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import UploadModal from "./UploadModal";

const Avatar = ({
  src,
  textWithoutPic,
  upload = false,
  width,
  height
}: {
  src: ImageSourcePropType | undefined;
  textWithoutPic?: string;
  upload?: boolean; // true for upload avatar, false for text avatar
  width?: number;
  height?: number;
}) => {
    const [ modalVisible, setModalVisible ] = useState(false);
  return (
    <View className={`rounded-full bg-slate-100 border-4 border-gray-500 w-52 h-52 justify-center items-center w-[${width}px] h-[${height}px]`} >
      <Image
        source={src}
        resizeMode="contain"
        alt="Profile Image"
        className="flex-1 w-full h-full z-10 rounded-full"
      />
      <Text className="text-[4rem] font-bold absolute">{textWithoutPic}</Text>
      { upload && ( 
        <Pressable
          className="absolute bottom-0 right-0 p-2 bg-gray-400 rounded-3xl z-20"
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="photo-camera" size={30} color="black" />
        </Pressable>
      )}
      {/* Upload Avatar Modal */}
      <UploadModal modalVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default Avatar;
