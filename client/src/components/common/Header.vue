<template>
  <div
    class="top-0 h-14 w-full fixed flex z-[999] bg-[#eaf8f3] items-center pr-5 justify-end"
  >

    <v-btn v-if="!getIsLogin" @click="login">Login</v-btn>
    <v-btn v-else @click="logout">Logout</v-btn>
  </div>
</template>


<script lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { toast } from 'vue-sonner';


export default defineComponent({
    name:'Header',
    components:{},
    setup(){
        const userStore = useUserStore();
        
        const { getIsLogin } = storeToRefs(userStore);
        
        const login=()=>{
            userStore.setLoginData({
            isLogin:true,
            userName:'Sourav',
            userEmail:'souravdas@gmail.com',
            role:'RegisterUser',
            userImage:'https://www.dreamstime.com/royalty-free-stock-photo-fairy-tale-image7892955'
        })
        toast.success('Login Successfully')
            window.location.reload()
        toast.success('Login Successfully')
        }
        const logout=()=>{
            userStore.logout();
            toast.success('Logout Successfully')
            window.location.reload()
            toast.success('Logout Successfully')
        }
        return { getIsLogin,login,logout }
    }
})

</script>