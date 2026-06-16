import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";

export function useBlogLogic(debounceTitle: string) {
  const isSearching = debounceTitle.length > 0;
  const pageNum = 9;

  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPosts,
    isSearching ? "skip" : {},
    { initialNumItems: pageNum },
  );

  const {
    results: searchResults,
    status: searchStatus,
    loadMore: searchLoadMore,
  } = usePaginatedQuery(
    api.posts.searchPosts,
    isSearching ? { title: debounceTitle } : "skip",
    { initialNumItems: pageNum },
  );

  const blogs = isSearching ? searchResults : results;
  const activeStatus = isSearching ? searchStatus : status;
  const activeLoadMore = isSearching ? searchLoadMore : loadMore;
  const isLoading = isSearching
    ? searchStatus === "LoadingFirstPage"
    : status === "LoadingFirstPage";

  return {
    blogs,
    activeStatus,
    activeLoadMore,
    isLoading,
    isSearching,
    pageNum,
  };
}
