import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useBlogSearch() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchBlog, setSearchBlog] = useState<string>(
    searchParam.get("q") ?? "",
  );
  const [debounceTitle] = useDebounce(searchBlog, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounceTitle) {
      params.set("q", debounceTitle);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [debounceTitle, pathname, router]);

  return {
    searchBlog,
    setSearchBlog,
    debounceTitle,
  };
}
