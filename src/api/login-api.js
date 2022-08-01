import axios from "axios";

export function login(email, password) {
    return new Promise((resolve, reject) => {
        axios
            .get("http://127.0.0.1:8080/login", {params: {email: email, password: password}})
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}

export function register(user) {
    return new Promise((resolve, reject) => {
        axios
            .post("http://127.0.0.1:8080/users", {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            })
            .then((response) => resolve(response.data))
            .catch((err) => reject(err));
    });
}