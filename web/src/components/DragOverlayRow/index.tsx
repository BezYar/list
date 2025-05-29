import { Checkbox } from "@mui/material";
import type { DragOverlayRowProps } from "./types";

export default function DragOverlayRow({ item }: DragOverlayRowProps) {
  return (
    <div className="row">
      <Checkbox checked={item.selected} readOnly />
      <span>Item #{item.id}</span>
    </div>
  );
}
