import { atom, selector } from "recoil";

// Atom for managing drawer open/close state
export const drawerOpenState = atom({
	key: "drawerOpenState",
	default: false, // Initial state is closed
});

// Atom for drawer title
export const drawerTitleState = atom({
	key: "drawerTitleState",
	default: "", // Initial title
});

// Atom for drawer content
export const drawerContentState = atom({
	key: "drawerContentState",
	default: null, // Initial content, null or default content
});

export const initDrawerState = selector({
	key: "initDrawerState",
	set: ({ set }, { title, content }) => {
		if (content) {
			set(drawerContentState, content);
		}
		if (title) {
			set(drawerTitleState, title);
		}
		set(drawerOpenState, true);
	},
    get: ({ get }) => {
      const title = get(drawerTitleState);
      const content = get(drawerContentState);
  
      return { title, content };
    },
});

export const closeDrawerState = selector({
	key: "closeDrawerState",
	set: ({ reset }) => {
        reset(drawerContentState);
        reset(drawerTitleState);
		reset(drawerOpenState);
	},
    get: ({ get }) => {
      const title = get(drawerTitleState);
      const content = get(drawerContentState);
      const open = get(drawerOpenState);
  
      return { title, content, open };
    },
});
