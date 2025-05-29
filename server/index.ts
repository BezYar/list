import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const state = {
  sortedList: Array.from({ length: 1_000_000 }, (_, i) => i++),
  selected: new Set<number>(),
};

app.get('/items', (req, res) => {
  const search = req.query.search?.toString();
  const offset = parseInt(req.query.offset?.toString() ?? '0');
  const limit = parseInt(req.query.limit?.toString() ?? '20');

  let items = state.sortedList;

  if (search) {
    items = items.filter((item) => item.toString().includes(search));
  }

  const paginated = items.slice(offset, offset + limit);

  res.json({
    total: items.length,
    items: paginated.map((id) => ({
      id,
      selected: state.selected.has(id),
    })),
  });
});

app.post("/swap", (req, res) => {
  const { activeId, overId } = req.body;
  const oldIndex = state.sortedList.findIndex((id) => id === activeId);
  const newIndex = state.sortedList.findIndex((id) => id === overId);

  if (
    oldIndex === -1 || newIndex === -1 ||
    oldIndex === newIndex
  ) {
    res.status(400).json({ error: "Invalid swap" });
    return;
  }

  const [movedItem] = state.sortedList.splice(oldIndex, 1);
  state.sortedList.splice(newIndex, 0, movedItem);

  res.sendStatus(200);
});

app.post("/select", (req, res) => {
  const { id, selected } = req.body;

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
