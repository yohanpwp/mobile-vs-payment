import { View, ActivityIndicator, Dimensions, Platform } from "react-native";

const Loader = ({ isLoading }: {isLoading: boolean}) => {
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-[#41414186] z-10"
      style={{
        height: screenHeight,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#0000ff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;