import { useState, useEffect } from 'react';

interface PaginationResult<T> {
  items: T[];
  total: number;
}

function usePagination<T>(
  fetchData: (page: number, limit: number) => Promise<PaginationResult<T>>,
  limit: number,
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchData(currentPage, limit);
        setData(result.items);
        setTotalPages(Math.ceil(result.total / limit));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage, limit, fetchData]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    data,
    totalPages,
    isLoading,
    nextPage,
    prevPage,
    goToPage,
  };
}

export default usePagination;
