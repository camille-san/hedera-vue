<script setup>

import {onMounted} from "vue";
import {store} from './store'
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import Incomes from "./pages/Incomes.vue";
import Expenses from "./pages/Expenses.vue";
import Reports from "./pages/Reports.vue";
import UserInfos from "./pages/UserInfos.vue";

const HOME = 'HOME';
const INCOMES = 'INCOMES';
const EXPENSES = 'EXPENSES';
const REPORTS = 'REPORTS';
const USER_INFOS = 'USER_INFOS';

function setPage(page) {
  store.current_page = page;
}

function isActive(page) {
  return store.current_page == page;
}

function isActiveClass(page) {
  return isActive(page) ? 'btn-hedera-active' : '';
}

function logout() {
  store.isLogged = false;
  store.user = null;
}

onMounted(() => {
  store.current_page = HOME;
})

</script>


<template>
  <div id="liveAlertPlaceholder"></div>
  <div class="card mx-5 mt-2">
    <div class="card-header container-fluid">
      <div class="row pt-2">
        <!--LOGO-->
        <div class="col-11">
          <div class="row">
            <div class="col-3">
              <h2 @click="setPage(HOME)"><img src="/leaf.png" width="30" height="30"
                                              class="me-2" style="margin-top: -10px"/><span
                  class="text-hedera">Hedera</span></h2>
            </div>
            <!--MENU-->
            <div class="col-9">
              <ul class="nav justify-content-center">
                <li class="nav-item me-2">
                  <button class="btn btn-hedera" @click="setPage(HOME)" :disabled="!store.isLogged"
                          :class="isActiveClass(HOME)"><i
                      class="bi bi-house-fill"></i>
                  </button>
                </li>
                <li class="nav-item me-2">
                  <button class="btn btn-hedera" @click="setPage(INCOMES)" :disabled="!store.isLogged"
                          :class="isActiveClass(INCOMES)"><i
                      class="bi bi-graph-up-arrow me-2"></i>Incomes
                  </button>
                </li>
                <li class="nav-item me-2">
                  <button class="btn btn-hedera" @click="setPage(EXPENSES)" :disabled="!store.isLogged"
                          :class="isActiveClass(EXPENSES)"><i
                      class="bi bi-graph-down-arrow me-2"></i>Expenses
                  </button>
                </li>
                <li class="nav-item">
                  <button class="btn btn-hedera" @click="setPage(REPORTS)" :disabled="!store.isLogged"
                          :class="isActiveClass(REPORTS)"><i
                      class="bi bi-file-earmark-bar-graph me-2"></i>Reports
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--LOGIN-->
        <div class="col-1 dropdown text-end">
          <button :disabled="!store.isLogged" class="btn btn-hedera"
                  :class="isActiveClass(USER_INFOS)"><i
              class="bi bi-person-fill"></i>
          </button>
          <ul v-if="store.isLogged">
            <li><a class="dropdown-item" @click="setPage(USER_INFOS)">Infos</a></li>
            <!--            <li><a class="dropdown-item" href="#">Another action</a></li>-->
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" @click="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body container-fluid">
      <div v-if="store.isLogged">
        <div v-if="isActive(HOME)">
          <Home/>
        </div>
        <div v-else-if="isActive(INCOMES)">
          <Incomes/>
        </div>
        <div v-else-if="isActive(EXPENSES)">
          <Expenses/>
        </div>
        <div v-else-if="isActive(REPORTS)">
          <Reports/>
        </div>
        <div v-else-if="isActive(USER_INFOS)">
          <UserInfos/>
        </div>
      </div>
      <div v-else>
        <Login/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
