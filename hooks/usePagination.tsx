import React, { useState, useEffect, useCallback } from "react";

const initialData = {
  data: [] as any,
  totalResult: 0,
  status: true,
  pageNo: 1,
  perPage: 10,
  totalPages: 1,
};

const usePagination = <T extends any[]>() => {
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const [data, setData] = useState<T>(initialData.data);
  const [totalResult, setTotalResult] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [perPage, setPerPage] = useState(initialData.perPage);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [defaultData, setDefaultData] = useState<T>(initialData.data);

  //Fetch Data for given page
  let fetchData: Promise<T>
  const updateData = async (
    rfunction: Promise<T>,
    page: number,
    perPage = 10
  ) => {
    fetchData = rfunction
    try {
      const resultOld = await rfunction;
      if (resultOld) {
        const result = {
          data: resultOld,
          totalResult: resultOld.length,
          status: true,
          pageNo: page,
          perPage: perPage,
          totalPages: Math.ceil(resultOld.length / perPage),
        };
        const startPage = (result.pageNo - 1) * result.perPage;
        setData(result.data.slice(startPage, startPage + perPage) as T);
        // setData(result.data);
        setDefaultData(result.data);
        setTotalResult(result.totalResult);
        setPageNo(result.pageNo);
        setPerPage(result.perPage);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setInitialLoader(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // useEffect(() => {
  //   updateData(fetchData as Promise<T>, pageNo);
  // }, [pageNo]);

  const handleRefresh = () => {
    setRefreshing(true);
    setInitialLoader(true);
    updateData(fetchData as Promise<T>, pageNo, perPage);
  };

  const handleFilter = (filter: string) => {
    console.log(filter);
    if (filter.length == 0) {
      setData(defaultData);
      return;
    }
    const filterData = defaultData.filter((items) => items.status == filter);
    setData(filterData as T);
  };

  const handlePageClick = (p: number) => setPageNo(p);

  const loadMore = () => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      setPageNo((pageNo) => pageNo + 1);
    }
    updateData(fetchData as Promise<T>, pageNo, perPage);
  };

  return {
    data,
    defaultData,
    updateData,
    totalResult,
    loadingMore,
    handleFilter,
    handleRefresh,
    handlePageClick,
    loadMore,
    pageNo,
    totalPages,
    initialLoader,
    refreshing,
  };
};

export default usePagination;
