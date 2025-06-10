import { House } from '@/models/house.interface'
import { create } from 'zustand'

interface HouseState {
  houses: House[];
  setHouses: (houses: House[]) => void;
}

export const useHouseStore = create<HouseState>((set) => ({
    houses: [],
    setHouses: (houses: House[]) => set(() => ({ houses })),
}))
