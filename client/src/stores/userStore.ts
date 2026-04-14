import { defineStore } from 'pinia'

export interface UserState {
  isLogin: boolean
  userEmail: string
  userName: string
  userImage: string
  role: 'Admin' | 'RegisterUser' | 'NormalUser'
}
export type Role = 'Admin' | 'RegisterUser' | 'NormalUser'
export const useUserStore = defineStore('user',  {
  // State

 state: () => ({
    isLogin : false,
    userEmail :null as string|null,
    userName :null as string|null,
    userImage : null as string|null,
    role : 'NormalUser' as Role
  }),

  getters: {
    getUserEmail: (state) => state.userEmail,
    getIsLogin: (state) => state.isLogin,
    getRole: (state) => state.role || 'NormalUser',
    getName: (state) => state.userName,
    getImage: (state) => state.userImage,
  },

  actions: {
    async setLoginData(payload: UserState) {
      
        this.isLogin = true;
        this.userEmail = payload.userEmail;
        this.userName= payload.userName;
        this.userImage= payload.userImage;
        this.role= payload.role;
    },


    logout() {
      this.isLogin = false;
      this.userEmail = null;
      this.userName=null;
      this.userImage=null;
      this.role='NormalUser'
    },
  },

  persist: true,
})
