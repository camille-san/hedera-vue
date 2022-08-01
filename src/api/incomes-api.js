import axios from "axios";

export function getIncomesTypes() {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/utils/incomes-types")
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function getRegularIncomesForUser(userId) {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/incomes/regulars", {params: {userId: userId}})
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function getSingleIncomesForUser(userId) {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/incomes/singles", {params: {userId: userId}})
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function postNewRegularIncome(regular) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://127.0.0.1:8080/incomes/regular", regular)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function postNewSingleIncome(single) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://127.0.0.1:8080/incomes/single", single)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function putRegularIncome(regular) {
    return new Promise((resolve, reject) => {
        axios
            .put("http://127.0.0.1:8080/incomes/regular", regular)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function putSingleIncome(single) {
    return new Promise((resolve, reject) => {
        axios
            .put("http://127.0.0.1:8080/incomes/single", single)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}