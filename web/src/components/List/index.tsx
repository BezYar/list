import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SortableRow from "../SortableRow";
import type { ListDataItem } from "./types";
import { fetchSorted, saveSwap, selectItem } from "../../services/api";

const PAGE_SIZE = 20;

export default function List() {
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<ListDataItem[]>([]);
  const itemIndicesMap = useMemo(() => new Map(items.map((item, index) => [item.id, index])), [items]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const loadItems = useCallback(async (limit = PAGE_SIZE, searchQuery = "") => {
    const res = await fetchSorted({ limit, search: searchQuery });
    setTotal(res.total);
    setItems(res.items);
  }, []);

  const loadMore = useCallback(() => {
    loadItems(items.length + PAGE_SIZE, search);
  }, [items.length, loadItems, search]);

  const handleSelectRow = useCallback((item: ListDataItem) => {
    selectItem(item);
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
  }, []);

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (!over?.id || active.id === over.id) return;

    const oldIndex = itemIndicesMap.get(Number(active.id));
    const newIndex = itemIndicesMap.get(Number(over.id));

    if (typeof oldIndex === "number" && typeof newIndex === "number") {
      const updated = [...items];
      const [movedItem] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, movedItem);
      setItems(updated);
      saveSwap(Number(active.id), Number(over.id), search).then(() => loadItems(items.length, search));
    }
  }, [itemIndicesMap, items, loadItems, search]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    setItems([]);
    loadItems(PAGE_SIZE, value);
  }, [loadItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <Paper elevation={3} sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ padding: 1 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      <Divider />

      {/* Scrollable content */}
      <Box
        id="scrollable-list"
        sx={{ flex: 1, overflow: "scroll" }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={Array.from(items.values())} strategy={verticalListSortingStrategy}>
            <InfiniteScroll
              dataLength={items.length}
              next={loadMore}
              hasMore={items.length < total}
              loader={<h4 style={{ padding: 16 }}>Loading...</h4>}
              height={600}
            >
              {Array.from(items.values()).map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  onSelect={handleSelectRow}
                />
              ))}
            </InfiniteScroll>
          </SortableContext>
        </DndContext>
      </Box>

      <Divider />

      {/* Footer */}
      <Box sx={{ padding: 1, textAlign: "left", background: 'white' }}>
        <Typography variant="caption">
          Loaded: {items.length} of {total}
        </Typography>
      </Box>
    </Paper>
  );
}