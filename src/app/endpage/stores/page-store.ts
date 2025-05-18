import { create } from "zustand"
import { PageType } from "../types/page-type"

interface PageActions {
  setPage: (page: PageType) => void
}

interface PageState {
  page?: PageType | null
  actions: PageActions
}

const usePageStore = create<PageState>()((set) => ({
  page: null,
  actions: {
    setPage: (page) => set({ page }),
  }
}))

export const usePage = () => usePageStore((state) => state.page)

export const usePageActions = () => usePageStore((state) => state.actions)
