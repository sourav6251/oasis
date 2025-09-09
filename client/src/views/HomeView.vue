<script  lang="ts">
import ApiStore from '@/api/apiStore';
import  { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
   name:'Home',
   components:{},
   setup(){
    const response=ref('');
    const apiCall=async()=>{
      try {
       response.value= await ApiStore.test();
      } catch (error) {
        
      }
    }

   onMounted(()=>{
    apiCall();
   })
   return{response}
   }
})

</script>

<template>
  <main>
  This is the home page
  Api call: {{ response }}
  </main>
</template>
