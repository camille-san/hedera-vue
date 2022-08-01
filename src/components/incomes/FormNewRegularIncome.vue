<script setup>

import {store} from "../../store.js";
import {postNewRegularIncome, putRegularIncome} from "../../api/incomes-api.js";
import {reactive, watch} from "vue";
import {useToast} from "vue-toastification";
import Datepicker from '@vuepic/vue-datepicker';

const props = defineProps({
  types: null,
  periodicities: null,
  context: null,
  selected: null
});

const toast = useToast();
const emit = defineEmits(['new-regular'])

const formRegular = reactive({
  label: "",
  type: "",
  amount: 0.0,
  periodicity: "",
  periodicityFactor: 1,
  startDate: new Date(),
  endDate: null
});

function loadForm() {
  if (props.context == 'SELECT') {
    formRegular.label = props.selected.label;
    formRegular.type = props.selected.type;
    formRegular.amount = props.selected.amount;
    formRegular.periodicity = props.selected.periodicity;
    formRegular.periodicityFactor = props.selected.periodicityFactor;
    formRegular.startDate = parseDateFromJSON(props.selected.startDate);
    formRegular.endDate = parseDateFromJSON(props.selected.endDate);
  } else {
    formRegular.periodicity = props.periodicities[2];
  }
}

loadForm();

watch(props, () => {
  loadForm();
})

function addNewRegular() {
  const regular = {
    user: {
      id: store.user.id
    },
    label: formRegular.label,
    type: formRegular.type,
    amount: formRegular.amount,
    periodicity: formRegular.periodicity,
    periodicityFactor: formRegular.periodicityFactor,
    startDate: formatDateForJSON(formRegular.startDate),
    endDate: formatDateForJSON(formRegular.endDate)
  }
  postNewRegularIncome(regular)
      .then((response) => {
        toast.success("Successfully added");
        emit('new-regular', response)
      })
      .catch((error) => toast.error(error.errorMessage));
}

function updateRegular() {
  const regular = {
    user: {
      id: store.user.id
    },
    label: formRegular.label,
    type: formRegular.type,
    amount: formRegular.amount,
    periodicity: formRegular.periodicity,
    periodicityFactor: formRegular.periodicityFactor,
    startDate: formatDateForJSON(formRegular.startDate),
    endDate: formatDateForJSON(formRegular.endDate)
  }
  putRegularIncome(regular)
      .then((response) => {
        toast.success("Successfully added");
        emit('new-regular', response)
      })
      .catch((error) => toast.error(error.errorMessage));
}

function previewStartDate() {
  const day = formRegular.startDate.getDate();
  const month = formRegular.startDate.getMonth() + 1;
  const year = formRegular.startDate.getFullYear();

  return day + '/' + month + '/' + year;
}

function previewEndDate() {
  const day = formRegular.endDate.getDate();
  const month = formRegular.endDate.getMonth() + 1;
  const year = formRegular.endDate.getFullYear();

  return day + '/' + month + '/' + year;
}

function formatDateForJSON(date) {
  if (date == null) {
    return null;
  }
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  const year = date.getFullYear();

  return day + '-' + month + '-' + year;
}

function parseDateFromJSON(date) {
  if (date == null) {
    return null;
  }
  const parts = date.split("-");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  return new Date(year, month - 1, day);
}

</script>

<template>
  <div class="card container-fluid g-0">
    <div class="card-header">
      <h4 v-if="context == 'NEW'">New Regular Income</h4>
      <h4 v-else>Regular Income</h4>
    </div>
    <div class="card-body">
      <div class="row justify-content-around g-3 mb-2">
        <div class="col-6">
        </div>
        <div class="col-6 form-floating">
          <select v-model="formRegular.type" class="form-select form-select-sm" id="formNewType">
            <option v-for="(type) in types">{{ type }}</option>
          </select>
          <label for="formNewType">Type</label>
        </div>
      </div>

      <div class="row justify-content-around g-3 mb-2">
        <div class="col-6 form-floating">
          <input type="text" v-model="formRegular.label" class="form-control" id="formNewLabel">
          <label for="formNewLabel" class="ms-1">Label</label>
        </div>
        <div class="col-6 form-floating">
          <input required type="number" step=".01" min="0" v-model="formRegular.amount" class="form-control"
                 id="formNewAmount">
          <label for="formNewAmount" class="ms-1">Amount</label>
        </div>
      </div>

      <div class="row justify-content-around g-3 mb-2">
        <div class="col-6 form-floating">
          <input type="number" min="0" v-model="formRegular.periodicityFactor" class="form-control" id="formNewFactor">
          <label for="formNewFactor" class="ms-1">Every</label>
        </div>
        <div class="col-6 form-floating">
          <select v-model="formRegular.periodicity" class="form-select form-select-sm" id="formNewPeriodicity">
            <option v-for="(p) in periodicities">{{ p }}</option>
          </select>
          <label for="formNewPeriodicity">Periodicity</label>
        </div>
      </div>

      <div class="row justify-content-around g-3 mb-2">
        <div class="col-6">
          <label for="formNewLabel" class="form-label mb-0">Start</label>
          <Datepicker v-model="formRegular.startDate" :format="previewStartDate" id="formNewStartDate"></Datepicker>
        </div>
        <div class="col-6">
          <label for="formNewAmount" class="form-label mb-0">End (optional)</label>
          <Datepicker v-model="formRegular.endDate" :format="previewEndDate" id="formNewEndDate"></Datepicker>
        </div>
      </div>
    </div>
    <div class="card-footer text-end">
      <button @click="loadForm()" class="btn btn-primary me-2">Reset</button>
      <button v-if="context == 'NEW'" @click="addNewRegular()" class="btn btn-primary">Add</button>
      <button v-else @click="updateRegular()" class="btn btn-primary">Update</button>
    </div>
  </div>
</template>

<style scoped></style>