import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
const BottomModal = ({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // Initial position off-screen

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Final position on-screen
      duration: 2000, // Duration of the animation
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Final position on-screen
      duration: 1000, // Duration of the animation
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideIn();
  }, [open]);

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const styles = StyleSheet.create({
    container: {
      display: open? 'flex' : 'none'
    },
    modal: {
      bottom: 0,
      width: "100%",
      backgroundColor: "white",
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      zIndex: 1000,
    },
  });

  return (
    <View className="absolute justify-end top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)]" style={styles.container}>
      <View className="flex-1 inset-0" onTouchEnd={closeModal}></View>
      <Animated.View
        style={[styles.modal, { transform: [{ translateY: slideAnim }] }]}
      >
        <Text className="text-2xl font-bold">{title}</Text>
        <View>{children}</View>
      </Animated.View>
    </View>
  );
};



export default BottomModal;
