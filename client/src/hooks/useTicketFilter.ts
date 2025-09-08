import { useState, useCallback } from "react";
import { TicketsFilter } from "../models/Ticket";

export const useTicketFilter = (onFilter: (filter: TicketsFilter) => void) => {
  const [filter, setFilter] = useState<TicketsFilter>({});

  const handleFilterChange = useCallback(
    (key: keyof TicketsFilter, value: string) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value || undefined,
      }));
    },
    []
  );

  const handleSearch = useCallback(() => {
    onFilter(filter);
  }, [filter, onFilter]);

  const clearFilters = useCallback(() => {
    setFilter({});
    onFilter({});
  }, [onFilter]);

  return {
    filter,
    handleFilterChange,
    handleSearch,
    clearFilters,
  };
};
