import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { displayText, displayNumber } from "@/components/display/displayText";
import Loader from "@/components/Loader";
import usePagination from "@/hooks/usePagination";
import { qrTableDataProps, useQrHistoryStore } from "@/context/QrHistoryStore";
import BottomModal from "@/components/BottomModal";
import SelectButton from "@/components/SelectButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import IconStatus from "@/components/display/IconStatus";
import { useTranslation } from "react-i18next";

const History = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();
  const { fetchData } = useQrHistoryStore();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [refreshModal, setRefreshModal] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    data,
    updateData,
    handleRefresh,
    handleFilter,
    initialLoader,
    refreshing,
  } = usePagination<qrTableDataProps[]>();

  // Fetch data from your database or API
  const getData = async () => {
    setIsLoading(true);
    try {
      updateData(fetchData(user), 1);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const color = useThemeColor({ light: "black", dark: "white" }, "text");

  const filterIcon = () => {
    if (!isFiltered) {
      return (
        <TouchableOpacity
          className="p-2"
          onPress={() => setShowFilterModal(true)}
        >
          <MaterialCommunityIcons name="filter" size={32} color={color} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          className="p-2"
          onPress={() => setShowFilterModal(true)}
        >
          <MaterialCommunityIcons name="filter-check" size={32} color={color} />
        </TouchableOpacity>
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOnRefresh = useCallback(() => {
    getData();
    setIsFiltered(false);
    setRefreshModal(!refreshModal);
    handleRefresh();
    setTimeout(() => setRefreshModal(false), 3000);
  }, []);

  const handleChangeFilter = (value: any) => {
    if (value == "") {
      setIsFiltered(false);
      handleFilter(value);
      return;
    } else {
      setIsFiltered(true);
      handleFilter(value);
    }
  };

  const statusList = [
    { id: 1, name: t("Paid"), value: "Paid" },
    { id: 2, name: t("Created"), value: "Created" },
    { id: 3, name: t("Canceled"), value: "Canceled" },
  ];

  return (
    <ThemedView className="h-full bg-slate-500">
      <Loader isLoading={isLoading} />
      <View className="flex-1">
        <View className="flex flex-row py-4 sm:px-6 mx-3 justify-between">
          <View className="justify-center">
            <ThemedText type="title">{t('Payment History')}</ThemedText>
          </View>
          <View className="flex-row">
          <TouchableOpacity
          className="p-2"
          onPress={() => router.push('/qr/scan')}
        >
              <MaterialCommunityIcons name="qrcode-scan" size={32} color={color} />
            </TouchableOpacity>
            {filterIcon()}</View>
        </View>

        {/* Create a new data table */}
        <FlatList
          data={data}
          keyExtractor={(data) => String(data.id)}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
          // debug={true}
          renderItem={(data) => {
            return (
              <View className="flex-row p-4 bg-slate-100 mx-2 my-3 rounded-2xl shadow-xl shadow-slate-600 min-h-[20vh]">
                <Link
                  href={{
                    pathname: "/qr/[id]",
                    params: { id: data.item.ref2 },
                  }}
                >
                  <View className="w-full h-full">
                    <View className="flex absolute -right-3 h-full justify-center">
                      <AntDesign name="right" size={20} color="gray" />
                    </View>
                    <View className="flex flex-row gap-1 items-center">
                      <View className="justify-center content-center">
                        {IconStatus(t(data.item.status))}
                      </View>
                      <Text className="ml-3 md:ml-7 text-lg sm:text-xl font-bold flex-1 flex-wrap">
                        {displayText.showOnlyAvailableText(data.item.customer)}
                      </Text>
                    </View>
                    <View className="mt-2 ml-4 gap-2">
                      <View className="flex flex-row gap-3">
                        <AntDesign name="tags" size={20} color="black" />
                        <Text>{data.item.ref2}</Text>
                      </View>
                      <View className="flex flex-row gap-3">
                        <Entypo name="calendar" size={20} color="black" />
                        <Text>
                          {displayText.formatDatesPicker(data.item.createdAt)}
                        </Text>
                      </View>
                      <View className="flex flex-row gap-3">
                        <Entypo name="price-tag" size={20} color="black" />
                        <Text>
                          ฿{" "}
                          {displayNumber.displayNumberWithComma(
                            data.item.amounts
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Link>
              </View>
            );
          }}
        />
      </View>
      <BottomModal
        title={t("Filter")}
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      >
        <View className="p-4">
          <View className="w-full">
            <Text>{t('Select a status')}:</Text>
            <SelectButton
              items={statusList}
              onChange={(e) => handleChangeFilter(e)}
              refreshing={refreshModal}
            />
          </View>
        </View>
      </BottomModal>
    </ThemedView>
  );
};

export default History;
