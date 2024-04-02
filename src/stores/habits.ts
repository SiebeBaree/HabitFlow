import { create } from "zustand";

interface HabitState {
    habits: string[];
    addBulkHabits: (habits: string[]) => void;
    addHabit: (habit: string) => void;
    removeHabit: (habit: string) => void;
}

export const useHabitStore = create<HabitState>()((set) => ({
    habits: [],
    addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
    removeHabit: (habit) =>
        set((state) => ({
            habits: state.habits.filter((h) => h !== habit),
        })),
    addBulkHabits: (habits) =>
        set((state) => ({ habits: [...state.habits, ...habits] })),
}));
