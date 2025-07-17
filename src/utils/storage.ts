import {StorageTypes, ItemWithId, User } from "../models/types.js";
import { getCurrentUserId } from "./helpers.js";

export function save<T extends ItemWithId>(key: StorageTypes, data: T | T[]): void {
  const currentUser = getCurrentUserId();
  if (!currentUser) throw new Error('No current user found');

  const storageKey = key !== 'users' ? `${key}_${currentUser}` : key;
  if (Array.isArray(data)) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } else {
    const existingData = localStorage.getItem(storageKey);
    let items: T[] = existingData ? JSON.parse(existingData) : [];
    items = items.filter(item => item.id !== data.id);
    items.push(data);
    localStorage.setItem(storageKey, JSON.stringify(items.sort((a, b) => a.id - b.id)));
  }
}

export function load<T extends ItemWithId>(key: StorageTypes, id?: number): T | T[] | null {
  const currentUser = getCurrentUserId();
  if (!currentUser) return null;

  const storageKey = key !== 'users' ? `${key}_${currentUser}` : key;
  const data = localStorage.getItem(storageKey);
  if (!data) {
    return null;
  }

  const parsedData: T[] = JSON.parse(data);
  if (id !== undefined) {
    return parsedData.find(item => item.id === id) || null;
  }
  return parsedData;
}

export function remove<T extends ItemWithId>(key: StorageTypes, id?: number): void {
  const currentUser = getCurrentUserId();
  if (!currentUser) return

  const storageKey = key !== 'users' ? `${key}_${currentUser}` : key;
  if (id !== undefined) {
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
