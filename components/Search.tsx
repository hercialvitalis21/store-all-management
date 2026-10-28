"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(searchQuery);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const current = searchParams.get("query") || "";
    if (debouncedQuery === current) return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedQuery.length === 0) {
      params.delete("query");
      setOpen(false);
    } else {
      params.set("query", debouncedQuery);
      setOpen(true);
    }

    const next = params.toString();
    router.replace(next ? `${path}?${next}` : path, { scroll: false });
  }, [debouncedQuery, path, router, searchParams]);

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <input
          value={query}
          placeholder="Search..."
          className="search-input bg-transparent"
          onChange={(event) => setQuery(event.target.value)}
        />
        {open && (
          <ul className="search-result">
            <li className="empty-result">No files found</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
