import { useEffect } from "react";

const useInfiniteScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  findAll: Function,
  page: number,
  loading: boolean,
  search?: string,
  hasMore?: boolean,
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        findAll(search, page + 1);
      }
    };

    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, findAll, hasMore, loading, search]);
};

export default useInfiniteScroll;
