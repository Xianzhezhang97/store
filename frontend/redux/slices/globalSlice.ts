import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

// Define the state for the modal
interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
}

interface Notification {
  id: string;
  isOpen: boolean;
  Message: string;
  Type: string;
  timeout?: number;
  closeButton?: boolean;
}

// Define the overall components state
interface ComponentsState {
  TabBar: boolean;
  Footer: boolean;
  Modal: ModalState;
  Sidebar: boolean;
  GobalPadding: boolean;
  Scroll: boolean;
  Background: boolean;
  notifications: Notification[];
}

// Define the initial state of the components
const initialState: ComponentsState = {
  TabBar: true,
  Footer: true,
  Sidebar: true,
  Modal: { isOpen: false, content: '<p>wewe</p>' },
  GobalPadding: true,
  Scroll: true,
  Background: false,
  notifications: [],
};

// Create a slice for global component state management
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobal: (state, action: PayloadAction<Partial<ComponentsState>>) => {
      Object.assign(state, action.payload);
    },
    uniqueStyle: (state) => {
      state.GobalPadding = false;
      state.TabBar = false;
    },
    generalStyle: (state) => {
      state.GobalPadding = true;
      state.TabBar = true;
    },
    setPadding: (state, action: PayloadAction<boolean>) => {
      state.GobalPadding = action.payload;
    },
    setTabBar: (state, action: PayloadAction<boolean>) => {
      state.TabBar = action.payload;
    },
    setScroll: (state, action: PayloadAction<boolean>) => {
      state.Scroll = action.payload;
    },
    setBackground: (state, action: PayloadAction<boolean>) => {
      state.Background = action.payload;
    },
    openModal: (
      state,
      action: PayloadAction<{ content: ReactNode; isOpen: boolean }>,
    ) => {
      state.Modal.isOpen = action.payload.isOpen;
      state.Modal.content = action.payload.content; // Update the content of the modal
    },
    closeModal: (state) => {
      state.Modal.isOpen = false;
      state.Modal.content = null; // Set content to null when the modal is closed
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

// Export actions and reducer
export const {
  setGlobal,
  uniqueStyle,
  generalStyle,
  setPadding,
  setBackground,
  setTabBar,
  setScroll,
  openModal,
  addNotification,
  removeNotification,
  closeModal,
} = globalSlice.actions;
export default globalSlice.reducer;
