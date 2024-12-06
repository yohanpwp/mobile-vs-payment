import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { qrBase } from "@/lib/qrdatabase";
import { displayText, displayNumber } from "@/components/display/displayText";
import Loader from "@/components/Loader";
import usePagination from "@/hooks/usePagination";

interface qrTableDataProps {
  id: number;
  qrCode: string;
  amounts: string;
  customer: string;
  status: string;
  ref1: string;
  ref2: string;
  ref3: string;
  createdAt: string;
  remark: string;
  scbResponse: string;
}

const History = () => {
  const { user, isLoading, setIsLoading, setPropsValue } = useGlobalContext();
  const {
    data,
    fetchData,
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
        const result: qrTableDataProps[] = await qrBase.getHistoryQrCode(user);
        setPropsValue(result);
        fetchData(result, 1, 4);
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
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <ThemedView className="h-full bg-slate-500">
      <Loader isLoading={isLoading} />
      <View className="flex-1">
        <View className="flex p-8">
          <ThemedText className="text-2xl font-pextrabold">
            SCB Payment
          </ThemedText>
        </View>
        {/* Create a new data table */}
        {data.length == 0 && (
          <View>
            <ThemedText>No data found.</ThemedText>
          </View>
        )}
        {data.length > 0 && (
          <FlatList
            data={data}
            keyExtractor={(data) => String(data.id)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListFooterComponent={renderFooter}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            renderItem={(data) => (
              <View className="flex-row p-4 bg-slate-100 mx-2 my-3 rounded-lg shadow-md min-h-[220px]">
                <View className="w-3/4 h-auto">
                  <View className="flex flex-row gap-1 items-center">
                    <View className="rounded-full p-1 bg-slate-100 border-cyan-400 border-2 dark:bg-slate-400">
                      <ThemedText type="subtitle">{data.index + 1}</ThemedText>
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
                <View className="w-1/4 columns-3 h-auto justify-between ml-1">
                  <View className="flex justify-end">
                    <View className="justify-center content-center">
                      {displayText.showIconStatus(data.item.status)}
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ThemedView>
  );
};

export default History;
