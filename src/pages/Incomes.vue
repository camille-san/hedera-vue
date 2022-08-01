<script setup>
import {getIncomesTypes, getRegularIncomesForUser, getSingleIncomesForUser} from "../api/incomes-api.js";
import {store} from "../store.js";
import {reactive} from "vue";
import {useToast} from "vue-toastification";
import FormNewRegularIncome from "../components/incomes/FormNewRegularIncome.vue";
import RegularsDataTable from "../components/incomes/RegularsDataTable.vue";
import {getPeriodicities} from "../api/utils-api.js";

const toast = useToast();

const NONE = 'NONE';
const SELECT_REGULAR = 'SELECT_REGULAR';
const NEW_REGULAR = 'NEW_REGULAR';
const SELECT_SINGLE = 'SELECT_SINGLE';
const NEW_SINGLE = 'NEW_SINGLE';

const pageState = reactive({
  selectedIncome: null,
  context: NONE
});

const incomes = reactive({
  types: [],
  periodicities: [],
  regulars: [],
  singles: []
});

getTypes();
getAllPeriodicities();
getRegulars();
getSingles();

function getTypes() {
  getIncomesTypes()
      .then((response) => {
        incomes.types = response;
      })
      .catch((error) => toast.error(error.errorMessage));
};

function getAllPeriodicities() {
  getPeriodicities()
      .then((response) => {
        incomes.periodicities = response;
      })
      .catch((error) => toast.error(error.errorMessage));
};

function getRegulars() {
  getRegularIncomesForUser(store.user.id)
      .then((response) => {
        incomes.regulars = response;
      })
      .catch((error) => toast.error(error.errorMessage));
};

function getSingles() {
  getSingleIncomesForUser(store.user.id)
      .then((response) => {
        incomes.singles = response;
      })
      .catch((error) => toast.error(error.errorMessage));
};

function setContext(context) {
  pageState.context = context;
}

function setSelected(selected) {
  pageState.selectedIncome = selected;
}

function isActive(context) {
  return pageState.context == context;
}

// function addNewSingle() {
//   const single = {
//     user: {
//       id: store.user.id
//     },
//     label: formSingle.label,
//     type: formSingle.type,
//     date: formSingle.date,
//     amount: formSingle.amount
//   }
//   postNewSingleIncome(single)
//       .then((response) => {
//         toast.success("Successfully added")
//       })
//       .catch((error) => toast.error(error.errorMessage));
// }

function handleNewRegular(newRegular) {
  getRegulars();
  handleSelectRegular(newRegular);
}

function handleSelectRegular(newRegular) {
  setContext(SELECT_REGULAR);
  setSelected(newRegular)
}

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7">
        <h3>Regulars</h3>
        <RegularsDataTable :regulars="incomes.regulars" @select="(r) => handleSelectRegular(r)"/>
      </div>
      <div class="col-5">
        <div class="row mb-2 ">
          <div class="col-12 text-end">
            <button @click="setContext(NEW_REGULAR)" class="btn btn-sm btn-hedera me-2"><i
                class="bi bi-plus-circle me-1"></i> Add regular income
            </button>
            <button @click="setContext(NEW_SINGLE)" class="btn btn-sm btn-hedera"><i
                class="bi bi-plus-circle me-1"></i> Add single income
            </button>
          </div>
        </div>
        <div v-if="isActive(NEW_REGULAR)">
          <FormNewRegularIncome :context="'NEW'"
                                :types="incomes.types"
                                :periodicities="incomes.periodicities"
                                @new-regular="(i) => handleNewRegular(i)"/>
        </div>
        <div v-if="isActive(SELECT_REGULAR)">
          <FormNewRegularIncome :context="'SELECT'"
                                :selected="pageState.selectedIncome"
                                :types="incomes.types"
                                :periodicities="incomes.periodicities"
                                @new-regular="(i) => handleNewRegular(i)"/>
        </div>
        <div v-else-if="isActive(NEW_SINGLE)">
          new single
        </div>
        <div v-else-if="isActive(SELECT_SINGLE)">
          {{ pageState.selectedIncome }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>