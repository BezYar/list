import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface SwappedItem {
  value: number
  next?: number
}

const state = {
  list: Array.from({ length: 1_000_000 }, (_, i) => i),
  swapped: new Map<number, SwappedItem>(),
  selected: new Set<number>(),
};

function filterBySearch(search?: string) {
  let items = state.list;

  if (search) {
    items = items.filter((item) => item.toString().includes(search));
  }

  return items;
}

app.get('/items', (req, res) => {
  const search = req.query.search?.toString();
  const offset = parseInt(req.query.offset?.toString() ?? '0');
  const limit = parseInt(req.query.limit?.toString() ?? '20');

  const sortedList = filterBySearch(search);
  const paginated = sortedList.slice(offset, offset + limit);

  res.json({
    total: sortedList.length,
    items: paginated.map((id) => ({
      id,
      selected: state.selected.has(id),
    })),
  });
});

app.post("/swap", (req, res) => {
  const { activeId, overId, search } = req.body;

  if (typeof activeId !== 'number' || typeof overId !== 'number') {
    res.status(400).json({ error: 'Invalid IDs' });
    return;
  }

  const { list, swapped } = state;

  const oldIndex = list.findIndex((id) => id === activeId);
  const newIndex = list.findIndex((id) => id === overId);

  const sortedList = filterBySearch(search);

  const oldSortedIndex = sortedList.findIndex((id) => id === activeId);
  const newSortedIndex = sortedList.findIndex((id) => id === overId);

  if (
    oldIndex === -1 ||
    newIndex === -1 ||
    oldIndex === newIndex
  ) {
    res.status(400).json({ error: "Invalid swap" });
    return;
  }

  // Note: save swapped item
  swapped.set(
    activeId,
    {
      next: newSortedIndex === 0 ? sortedList[newSortedIndex] : sortedList[newSortedIndex + 1],
      value: activeId
    }
  );

  const [movedItem] = list.splice(oldIndex, 1);
  list.splice(newIndex, 0, movedItem);

  for (const { next, value } of swapped.values()) {
    // Note: updating prev swapped items if there is a dependency
    if (next === activeId) {
      swapped.set(value, { value, next: sortedList[oldSortedIndex + 1], });

      const findNewIndex = list.findIndex((id) => id === sortedList[oldSortedIndex + 1]);

      if (
        oldIndex - 1 < 0 ||
        !findNewIndex ||
        findNewIndex - 1 < 0
      ) return;

      const [movedItem] = list.splice(oldIndex - 1, 1);
      list.splice(findNewIndex - 1, 0, movedItem);
    };
  }

  res.sendStatus(200);
});

app.post("/select", (req, res) => {
  const { id, selected } = req.body;

  if (typeof id !== 'number' || typeof selected !== 'boolean') {
    res.status(400).json({ error: 'Invalid IDs' });
    return;
  }

  if (selected) {
    state.selected.add(id);
  } else {
    state.selected.delete(id);
  }

  res.sendStatus(200);
});

app.listen(3001, "0.0.0.0", () => {
  console.log("Server listening on http://localhost:3001");
});
