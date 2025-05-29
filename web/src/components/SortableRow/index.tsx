import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@mui/material";
import type { SortableRowProps } from "./types";
import { useCallback, useMemo } from "react";

export default function SortableRow({ item, onSelect }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const rowStyle = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition,
    background: item.selected ? "#e3f2fd" : "#fff",
    zIndex: isDragging ? 999 : undefined,
  }), [isDragging, item.selected, transform, transition]);

  const handleRowClick = useCallback(() => {
    onSelect({ id: item.id, selected: !item.selected });
  }, [item.id, item.selected, onSelect]);

  return (
    <div
      ref={setNodeRef}
      className="row"
      {...attributes}
      {...listeners}
      style={rowStyle}
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
    >
      <Checkbox
        checked={item.selected}
        readOnly
        sx={{ pointerEvents: "none", marginRight: 2 }}
      />
      <span>Item #{item.id}</span>
    </div>
  );
}
