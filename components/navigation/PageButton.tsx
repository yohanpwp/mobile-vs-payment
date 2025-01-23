import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";

interface PageButtonProps {
  onPress: () => void;
  currentPage: number;
  totalPages: number;
}
const PageButton = ({ onPress, currentPage, totalPages }: PageButtonProps) => {
  let startPage = Math.max(1, currentPage );
  let endPage = Math.min(totalPages);

  const buttons = [];

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <TouchableOpacity
        key={i}
        onPress={onPress}
        style={[
          styles.paginationButton,
          i === currentPage ? styles.activeButton : null,
        ]}
      >
        <Text style={{ color: "white" }}>{i}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="justify-center items-center">
        <FlatList
          data={buttons}
          keyExtractor={(data) => String(data.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => item.item}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "gray",
  },
  activeButton: {
    backgroundColor: "#22c55d",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default PageButton;
