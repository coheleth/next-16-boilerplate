function Link({
  index,
  currentPage,
  rootHref,
  children,
  query,
}: {
  index: string;
  currentPage: string;
  rootHref: string;
  children?: React.ReactNode;
  query?: string;
}) {
  const className = index === currentPage ? "active" : "";
  let target = `/${rootHref}?page=${index}`;
  if (query != "") {
    target = `/${rootHref}?query=${query}&page=${index}`;
  }
  return (
    <a href={index !== currentPage ? target : undefined} className={className}>
      {children}
    </a>
  );
}

export default function Pagination(
  props: Readonly<{
    pages: number;
    currentPage: number;
    rootHref: string;
    query?: string;
  }>,
) {
  const currentPage = props.currentPage;
  const pages = props.pages;
  const query = props.query;
  const rootHref = props.rootHref;

  const pageArray = Array.from(
    { length: props.pages },
    (v: number, i) => i + 1,
  );

  return (
    <>
      {pageArray.length > 1 && (
        <div className="flex gap-2">
          {currentPage > 1 && (
            <Link
              index={(currentPage - 1).toString()}
              currentPage={currentPage.toString()}
              query={query}
              rootHref={rootHref}
            >
              &larr;
            </Link>
          )}
          {currentPage < pages && (
            <Link
              index={(currentPage + 1).toString()}
              currentPage={currentPage.toString()}
              query={query}
              rootHref={rootHref}
            >
              &rarr;
            </Link>
          )}
        </div>
      )}
    </>
  );
}
