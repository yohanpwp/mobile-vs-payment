import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { qrBase } from "@/lib/qrdatabase";
import { displayText, displayNumber } from "@/components/display/displayText";
import Loader from "@/components/Loader";
import usePagination from "@/hooks/usePagination";
import { qrTableDataProps, useQrHistoryStore } from "@/context/QrHistoryStore";

const History = () => {
  const { user, isLoading, setIsLoading } = useGlobalContext();
  const { fetchData } = useQrHistoryStore();
  const {
    data,
    updateData,
    totalResult,
    loadingMore,
    handleRefresh,
    loadMore,
    pageNo,
    totalPages,
    initialLoader,
    refreshing,
  } = usePagination<qrTableDataProps[]>();

  // Fetch data from your database or API
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        updateData(fetchData(user), 1, 4);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const renderFooter = () => {
    if (!loadingMore || data.length < 4) return null;
    return (
      <View>
        <Text style={{ alignSelf: "center", fontSize: 20 }}>Load More</Text>
        <ActivityIndicator animating size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <ThemedView className="h-full bg-slate-500">
      <Loader isLoading={isLoading} />
      <View className="flex-1">
        <View className="flex p-8">
          <ThemedText type="title">SCB Payment</ThemedText>
        </View>
        {/* Create a new data table */}
        <FlatList
          data={data}
          keyExtractor={(data) => String(data.id)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          // debug={true}
          renderItem={(data) => {
            if (initialLoader) {
              return (
                <View>
                  <ActivityIndicator animating size="large" color="#0000ff" />
                  <ThemedText>No data found.</ThemedText>
                </View>
              );
            } else {
              return (
                <View className="flex-row p-4 bg-slate-100 mx-2 my-3 rounded-lg shadow-md min-h-[220px]">
                  <View className="w-full h-auto">
                    <View className="flex flex-row gap-1 items-center">
                      <View className="justify-center content-center">
                        {displayText.showIconStatus(data.item.status)}
                      </View>
                      <ThemedText type="subtitle">
                        {displayText.showOnlyAvailableText(data.item.customer)}
                      </ThemedText>
                    </View>
                    <ThemedText>{data.item.ref2}</ThemedText>
                    <ThemedText>
                      Generated Dates:{" "}
                      {displayText.formatDatesPicker(data.item.createdAt)}
                    </ThemedText>
                    <ThemedText>
                      Amounts:{" "}
                      {displayNumber.displayNumberWithComma(data.item.amounts)}{" "}
                      Baht
                    </ThemedText>
                    <ThemedText>
                      Remark:{" "}
                      {displayText.showOnlyAvailableText(data.item.remark)}
                    </ThemedText>
                    <Link
                      href={{
                        pathname: "/qr/[id]",
                        params: { id: data.index },
                      }}
                    >
                      <Text className="underline text-blue-600">
                        See Instruction
                      </Text>
                    </Link>
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
    </ThemedView>
  );
};

export default History;
