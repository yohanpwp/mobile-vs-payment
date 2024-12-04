import { View, Text, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { qrBase } from "@/lib/qrdatabase";
import { displayText } from "@/components/display/displayText";
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
  const { user, isLoading, setIsLoading } = useGlobalContext();
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
        <Text style={{alignSelf:'center', fontSize:20 }}>Load More</Text>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>

    );
  }

  return (
    <SafeAreaView className="h-full">
      <Loader isLoading={isLoading} />
      <ThemedView className="h-full">
        <View className="flex-1">
          <ThemedText>SCB Payment</ThemedText>
          <ThemedText>{`${pageNo}/${totalPages}`}</ThemedText>
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
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
              ListFooterComponent={renderFooter}
              onEndReached={loadMore}
              onEndReachedThreshold={0.1}
              renderItem={(data) => (
                <View className="flex-row p-4 bg-slate-400 my-3">
                  <View className="w-3/4 h-auto">
                    <ThemedText>{data.index + 1}</ThemedText>
                    <ThemedText>{data.item.ref2}</ThemedText>
                    <ThemedText>
                      Generated Dates: {data.item.createdAt}
                    </ThemedText>
                    <ThemedText>Amounts: {data.item.amounts} Baht</ThemedText>
                    <ThemedText>
                      Customer Name:{" "}
                      {displayText.showOnlyAvailableText(data.item.customer)}
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
                      {data.item.status == "Paid" && (
                        <Text className="underline text-blue-600">
                          See Instruction
                        </Text>
                      )}
                    </Link>
                  </View>
                  <View className="w-1/4 columns-3 h-auto justify-between">
                    <View className="bg-black-100 w-full col-span-2 h-36">
                      <Text>ASDWQ</Text>
                    </View>
                    <View className="absolute -right-2 -bottom-7">
                      <View className="h-8 bg-green-500 rounded-5">
                        <ThemedText>{displayText.showIconStatus(data.item.status)}</ThemedText>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default History;
