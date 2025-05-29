import axios from "axios";
import type { GetItemsParams, ListData, ListDataItem } from "../components/List/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function fetchSorted(params?: GetItemsParams): Promise<ListData> {
  try {
    const res = await axios.get(`${SERVER_URL}/items`, { params });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch items", error);
    return { total: 0, items: [] };
  }
}

export async function saveSwap(activeId: number, overId: number): Promise<void> {
  try {
    await axios.post(`${SERVER_URL}/swap`, { activeId, overId });
  } catch (error) {
    console.error("Failed to save sorted items", error);
  }
}

export async function selectItem(item: ListDataItem): Promise<void> {
  try {
    await axios.post(`${SERVER_URL}/select`, item);
  } catch (error) {
    console.error("Failed to select item", error);
  }
}
