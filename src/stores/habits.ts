import { create } from "zustand";

type Habit = {
    id: number;
    name: string;
};

type HabitState = {
    habits: Habit[];
    addBulkHabits: (habits: Habit[]) => void;
    addHabit: (habit: Habit) => void;
    removeHabit: (habit: Habit) => void;
    updateHabit: (id: number, newName: string) => void;
};

export const useHabitStore = create<HabitState>()((set) => ({
    habits: [],
    addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
    removeHabit: (habit) =>
        set((state) => ({
            habits: state.habits.filter((h) => h.id !== habit.id),
        })),
    addBulkHabits: (habits) =>
        set((state) => ({ habits: [...state.habits, ...habits] })),
    updateHabit: (id, newName) =>
        set((state) => ({
            habits: state.habits.map((h) =>
                h.id === id ? { ...h, name: newName } : h,
            ),
        })),
}));
