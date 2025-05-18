import { create } from "zustand"

interface AuthActions {
  setToken: (token: string) => void
}

interface AuthState {
  token?: string | null
  actions: AuthActions
}

const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  actions: {
    setToken: (token) => set({ token }),
  }
}))

export const useAuthToken = () => useAuthStore((state) => state.token)

export const useAuthActions = () => useAuthStore((state) => state.actions)
