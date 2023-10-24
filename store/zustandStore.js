import {create} from 'zustand';

const useBearStore = create(set => ({
  //   bears: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //     removeAllBears: () => set({ bears: 0 }),

  isLoggedIn: false,
  setLoginState: (b, up) => set(state => ({isLoggedIn: b, userProfile: up})),

  userProfile: null,
  // setUserProfile: (up) => set((state) => ({ userProfile: up })),

  userProfilePhotoUrl: null,
  setUserProfilePhotoUrl: url => set({userProfilePhotoUrl: url}),
}));

export default useBearStore;
