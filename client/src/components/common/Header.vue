<template>
  <div
    class="top-0 h-14 w-full fixed flex z-[999] bg-[#eaf8f3] items-center pr-5 justify-end"
  >
    <div class="flex items-center gap-5">
      <v-container>
        <v-menu
          
          offset-y
        >
          <!-- Text activator -->
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="font-weight-bold" style="cursor:pointer">
              Links
            </span>
          </template>

          <!-- Dropdown list -->
          <v-list>
            <v-list-item
              v-for="link in links"
              :key="link.name"
              :to="link.link"  
            >
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>

      <v-btn v-if="!getIsLogin" @click="login">Login</v-btn>
      <v-btn v-else @click="logout">Logout</v-btn>
    </div>
  </div>
</template>


<script lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';


export default defineComponent({
    name:'Header',
    components:{},
    setup(){
        const router = useRouter()
        const userStore = useUserStore();
        const { getIsLogin } = storeToRefs(userStore);
        const links= [
          { name: "Home", link: "/" },
          { name: "* Services", link: "/service" },
          { name: "* Gallery", link: "/gallery" },
          { name: "* Booking", link: "/booking" },
          { name: "* Contact", link: "/contact" },
          { name: "About Us", link: "/about" },
          { name: "* Beauty Tips", link: "/beauty-tips" },
          { name: "* Reviews", link: "/review" },
          { name: "* Policies", link: "/policies" }
        ]

        
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
        return { getIsLogin,login,logout,router,links }
    }
})

</script>