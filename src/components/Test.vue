<template>
  <div class="container-fluid mt-5">
    <div class="card">
      <div class="card-body">
        <div>
          <button type="button" class="btn btn-light">Info</button>
        </div>
        <div>{{ msg_prop }}</div>
        <div>{{ msg_data }}</div>
        <div>{{ getMsgMethod() }}</div>
        <div>{{ state.msg_api }}</div>
        <div>{{ store.msg }}</div>
      </div>
    </div>
  </div>
  <Datepicker v-model="date"></Datepicker>
</template>

<script setup>

// Props
import {reactive, ref} from "vue";
import {store} from '../store'
import {login} from '../api/login-api.js'
import Datepicker from '@vuepic/vue-datepicker';


const date = ref();
defineProps({
  msg_prop: String,
});

const state = reactive({
  msg_api: ""
});

// Data
const msg_data = ref("UNE DATA");

// Methods
function getMsgMethod() {
  return "UN RESULT DE METHODE";
}

// Services
const getApi = () => {
  state.msg_api = "fcdsfgds"
  login()
      .then((response) => {
        console.log(response);
        state.msg_api = response;
      })
      .catch((error) => console.log(error));
};

getApi();

</script>

<style scoped></style>
