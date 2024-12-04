import { View, Text } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

const initialData = {
    data: [],
    totalResult: 0,
    status: true,
    pageNo: 1,
    perPage: 10,
    totalPages: 1
}

const usePagination = <T extends any[]>() => {
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const [data, setData] = useState<T>(initialData.data);
    const [totalResult, setTotalResult] = useState(initialData.totalResult);
    const [pageNo, setPageNo] = useState(initialData.pageNo);
    const [perPage, setPerPage] = useState(initialData.perPage);
    const [totalPages, setTotalPages] = useState(initialData.totalPages);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    //Fetch Data for given page
    const fetchData = async (resultOld: T, page: number, perPage = 10) => {
      try {
      const result = {
        data: resultOld,
        totalResult: resultOld.length,
        status: true,
        pageNo: page,
        perPage: perPage,
        totalPages: Math.ceil(resultOld.length / perPage)
      }

      if (result.status) {
        setData(page === 1 ? result.data : [...result, ...result.data]);
        setTotalResult(result.totalResult);
        setPageNo(result.pageNo);
        setPerPage(result.perPage)
        setTotalPages(result.totalPages);
      } else {
        console.error("Failed to fetch data")
      }} catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setInitialLoader(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    };

  const handleRefresh = useCallback( () => {
    setRefreshing(true);
    fetchData(data, 1, perPage);
  }, []);

  const loadMore = () => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      setPageNo(pageNo + 1);
      fetchData(data, pageNo, perPage);
    }
  }

  return {
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
  }
}

export default usePagination