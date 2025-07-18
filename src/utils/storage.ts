import { ItemWithId } from "../models/types.js";
import { getCurrentUserId } from "./helpers.js";

export const Storage = <T extends ItemWithId>(key: string) => {
  const currentUser = getCurrentUserId() || -1;
  const storageKey = key !== 'users' ? `${key}_${currentUser}` : key;

  const save = (data: T | T[]): void => {
    if (Array.isArray(data)) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } else {
      const existingData = localStorage.getItem(storageKey);
      let items: T[] = existingData ? JSON.parse(existingData) : [];
      items = items.filter(item => item.id !== data.id);
      items.push(data);
      localStorage.setItem(storageKey, JSON.stringify(items.sort((a, b) => a.id - b.id)));
    }
  };

  const load = (id?: number): T | T[] | null => {
    const data = localStorage.getItem(storageKey);
    if (!data) {
      return null;
    }

    const parsedData: T[] = JSON.parse(data);
    if (id !== undefined && currentUser !== -1) {
      return parsedData.find(item => item.id === id) || null;
    }
    return parsedData;
  }

  const remove = (id?: number): void => {
    if (id !== undefined && currentUser !== -1) {
      const data = localStorage.getItem(storageKey);
      if (!data) return;
      let items: T[] = JSON.parse(data);
      items = items.filter(item => item.id !== id);
      if (items.length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
    } else {
      localStorage.removeItem(storageKey);
    }
  }

  const getNewId = (): number => {
    const data = load() as T[];
    if (!data) return 0;
    return data.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  };

  return { save, load, remove, getNewId, };
}
