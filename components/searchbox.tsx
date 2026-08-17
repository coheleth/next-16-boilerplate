"use client";
//******************************************************************************
//    Simple searchbox component with placeholder.
//******************************************************************************

import { useSearchParams, useRouter } from "next/navigation";

export function SearchBox({
  placeholder,
  pathname,
  className,
}: {
  placeholder: string;
  pathname: string;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(
          (document.getElementsByClassName("searchbar")[0] as HTMLInputElement)
            .value,
        );
      }}
      className={`flex max-w-min ${className}`}
    >
      <input
        className="searchbar border-b-1 border-white p-1"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <input
        type="submit"
        value="Search"
        title="Search"
        className="cursor-pointer border border-white p-1"
      />
    </form>
  );
}
