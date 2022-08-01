import axios from "axios";

export function getPeriodicities() {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/utils/periodicities")
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}