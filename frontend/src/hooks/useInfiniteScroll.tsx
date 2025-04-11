import { useEffect } from "react";

const useInfiniteScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  findAll: Function,
  page: number,
  loading: boolean,
  search?: string
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 1) {
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
  }, [page, findAll]);
};
export default useInfiniteScroll;