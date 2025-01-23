import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

interface ItemListProps {
  value: string;
  name: string;
  id: number;
}
const SelectButton = ({
  items,
  onChange,
  refreshing = false,
}: {
  items: ItemListProps[];
  onChange: (value: any) => void;
  refreshing: boolean;
}) => {
  // When an item is selected, call a function passed as a prop to update the selected item state

  const [selectedItem, setSelectedItem] = useState<ItemListProps>();
  const [disabled, setDisabled] = useState(false);

  const handleItemSelection = (item: ItemListProps) => {
    let prevItem = selectedItem;
    try {
      if (prevItem && prevItem.id === item.id) {
        setSelectedItem(undefined);
        onChange("");
        return;
      }
      setDisabled(true);
      setSelectedItem(item);
      onChange(item.value);
    } catch (e) {
      console.error("Error updating selected item", e);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (refreshing) {
      // Simulate fetch or refresh logic here
      setSelectedItem(undefined);
      onChange("");
    }
  }, [refreshing]);

  return (
    <View className="w-screen">
      <View className="flex-row gap-3 md:gap-6 mt-2">
        {items.map((item, index) => (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => handleItemSelection(items[index])}
            key={index}
          >
            <View
              className={
                selectedItem?.id == item.id
                  ? "bg-red-300 border-1 rounded-lg shadow-sm p-4 min-w-20"
                  : "bg-slate-300 border-1 rounded-lg shadow-sm p-4 min-w-20"
              }
            >
              <Text className="text-center">{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SelectButton;
