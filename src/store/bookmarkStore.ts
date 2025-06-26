import { create } from "zustand";

type BookmarkStore = {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
  setBookmarks: (ids: number[]) => void;
};

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("bookmarks") || "[]")
    : [],
  addBookmark: (id) => {
    const updated = [...get().bookmarks, id];
    set({ bookmarks: updated });
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  },
  removeBookmark: (id) => {
    const updated = get().bookmarks.filter((bid) => bid !== id);
    set({ bookmarks: updated });
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  },
  isBookmarked: (id) => get().bookmarks.includes(id),
  setBookmarks: (ids) => {
    set({ bookmarks: ids });
    localStorage.setItem("bookmarks", JSON.stringify(ids));
  },
}));