import React, { useState, useEffect, useCallback } from 'react'

const initialData = ({
    data: [] as any,
    totalResult: 0,
    status: true,
    pageNo: 1,
    perPage: 10,
    totalPages: 1
})

const usePagination = <T extends any[]>() => {
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const [data, setData] = useState<T>(initialData.data);
    const [totalResult, setTotalResult] = useState(initialData.totalResult);
    const [pageNo, setPageNo] = useState(initialData.pageNo);
    const [perPage, setPerPage] = useState(initialData.perPage);
    const [totalPages, setTotalPages] = useState(initialData.totalPages);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [fetchData, setFetchData] = useState<Promise<T>>();

    //Fetch Data for given page
    const updateData = async (rfunction: Promise<T> , page: number, perPage = 10) => {
      try {
        setFetchData(rfunction)
        const resultOld = await rfunction

      if (resultOld) {
        const result = {
          data: resultOld,
          totalResult: resultOld.length,
          status: true,
          pageNo: page,
          perPage: perPage,
          totalPages: Math.ceil(resultOld.length / perPage) || 10
        }
        setData(result.data);
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

    useEffect(() => {
      updateData(fetchData as Promise<T>, pageNo);
    }, []);
   
  const handleRefresh = useCallback( () => {
    setRefreshing(true);
    setInitialLoader(true);
    updateData(fetchData as Promise<T>, 1, perPage);
  }, []);

  const loadMore = () => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      setPageNo(pageNo + 1);
      updateData(fetchData as Promise<T>, pageNo, perPage);
    }
  }

  return {
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
  }
}

export default usePagination