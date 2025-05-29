import type { ListDataItem } from "../List/types";

export interface SortableRowProps {
  item: ListDataItem
  onSelect: (item: ListDataItem) => void
}
