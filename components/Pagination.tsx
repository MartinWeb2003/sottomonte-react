import Link from "next/link";

function getPages(current: number, total: number) {
  // 1, 2, …, 100 style (with current neighbors)
  const set = new Set<number>();
  set.add(1);
  set.add(total);
  set.add(current);
  if (current - 1 >= 1) set.add(current - 1);
  if (current + 1 <= total) set.add(current + 1);
  return Array.from(set).sort((a, b) => a - b);
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  from,
  to,
  basePath,
  query,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
  basePath: string; // e.g. "/buy"
  query?: Record<string, string | undefined>;
}) {
  const pages = getPages(page, totalPages);

  const mkHref = (p: number) => {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v && v !== "all" && v !== "") params.set(k, v);
      });
    }

    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="pager">
      <div className="pager-top">
        <Link
          className={`pager-arrow ${page <= 1 ? "is-disabled" : ""}`}
          href={page <= 1 ? mkHref(1) : mkHref(page - 1)}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : 0}
        >
          ‹
        </Link>

        <div className="pager-pages">
          {pages.map((p, idx) => {
            const prev = pages[idx - 1];
            const showDots = idx > 0 && p - prev > 1;

            return (
              <span key={p} className="pager-chunk">
                {showDots && <span className="pager-dots">…</span>}

                <Link className={`pager-page ${p === page ? "is-active" : ""}`} href={mkHref(p)}>
                  {p}
                </Link>
              </span>
            );
          })}
        </div>

        <Link
          className={`pager-arrow ${page >= totalPages ? "is-disabled" : ""}`}
          href={page >= totalPages ? mkHref(totalPages) : mkHref(page + 1)}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : 0}
        >
          ›
        </Link>
      </div>

      <div className="pager-count">
        {from}–{to} of {totalItems} properties
      </div>
    </div>
  );
}
