import { Button } from "@/components/ui/button";
import type { LeadListMeta } from "@/types/lead.types";

type LeadsPaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  meta?: LeadListMeta | undefined;
  limit: number;
  isFetching: boolean;
};

export function LeadsPagination({ page, setPage, meta, limit, isFetching }: LeadsPaginationProps) {
  const totalPages = meta?.pages ?? Math.max(1, Math.ceil((meta?.total ?? 0) / limit));

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="text-sm font-medium text-muted-foreground">
        {meta ? (
          <span>
            Page <span className="text-foreground">{meta.page}</span> of{" "}
            <span className="text-foreground">{meta.pages}</span>
          </span>
        ) : (
          <span>Pagination will appear once leads load.</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1 || isFetching}
        >
          &larr; Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setPage((current) => current + 1)}
          disabled={isFetching || page >= totalPages}
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  );
}
