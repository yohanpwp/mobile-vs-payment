import { create } from "zustand";

interface TimeStore {
  time: Date;
  now: Date;
  updateTime: () => void;
  updateNow: () => void; // Update the current time every second.
}

const useTimeStore = create<TimeStore>((set) => ({
  time: new Date(),
  now: new Date(),
  updateTime: () => set((state) => ({ time: new Date() })),
  updateNow: () => set((state) => ({ now: new Date() })),
}));

export default useTimeStore;
