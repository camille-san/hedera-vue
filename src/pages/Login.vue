<script setup>
import {reactive} from "vue";
import {store} from '../store'
import {useToast} from "vue-toastification";
import {login, register} from "../api/login-api.js";

const toast = useToast();

const formLogin = reactive({
  email: "bruce.willis@email.com",
  password: "pwd111"
});

const formRegister = reactive({
  email: "julia.roberts@email.com",
  password: "pwd222",
  firstName: "Julia",
  lastName: "Roberts"
});

function callLogin() {
  login(formLogin.email, formLogin.password)
      .then((response) => {
        store.isLogged = true;
        store.user = response;
      })
      .catch((error) => {
        toast.error(error.errorMessage)
      });
};

function callRegister() {
  register(formRegister)
      .then((response) => {
        store.isLogged = true;
        store.user = response
      })
      .catch((error) => console.log(error));
};

</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-5 card mx-1">
        <div class="card-title mt-2">
          <h3>Login</h3>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <label for="formEmail" class="col-3 col-form-label">Email</label>
            <div class="col-9">
              <input type="text" v-model="formLogin.email" class="form-control" id="formEmail"
                     placeholder="email@example.com">
            </div>
          </div>
          <div class="row mb-3">
            <label for="formPassword" class="col-3 col-form-label">Password</label>
            <div class="col-9">
              <input type="password" v-model="formLogin.password" class="form-control" id="formPassword">
            </div>
          </div>
          <button @click="callLogin()" class="btn btn-outline-primary">Login
          </button>
        </div>
      </div>
      <div class="col-5 card mx-1">
        <div class="card-title mt-2">
          <h3>Register</h3>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <label for="formNewEmail" class="col-3 col-form-label">Email</label>
            <div class="col-9">
              <input type="text" v-model="formRegister.email" class="form-control" id="formNewEmail"
                     placeholder="email@example.com">
            </div>
          </div>
          <div class="row mb-3">
            <label for="formNewPassword" class="col-3 col-form-label">Password</label>
            <div class="col-9">
              <input type="password" v-model="formRegister.password" class="form-control" id="formNewPassword">
            </div>
          </div>
          <div class="row mb-3">
            <label for="formNewFirstName" class="col-3 col-form-label">First name</label>
            <div class="col-9">
              <input type="text" v-model="formRegister.firstName" class="form-control" id="formNewFirstName">
            </div>
          </div>
          <div class="row mb-3">
            <label for="formNewLastName" class="col-3 col-form-label">Last name</label>
            <div class="col-9">
              <input type="text" v-model="formRegister.lastName" class="form-control" id="formNewLastName">
            </div>
          </div>
          <button @click="callRegister()" class="btn btn-outline-primary">Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>