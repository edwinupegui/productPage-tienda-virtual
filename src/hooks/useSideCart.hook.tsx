import create from 'zustand';

type useSideCart = {
  state: boolean;
  added: boolean;
  open: () => void;
  close: () => void;
  addNew: () => void;
};

const useSideCart = create<useSideCart>((set) => ({
  state: false,
  added: false,
  open: () => set(() => ({ state: true })),
  close: () => set(() => ({ state: false })),
  addNew: () => set(() => ({ added: true })),
}));

export default useSideCart;
