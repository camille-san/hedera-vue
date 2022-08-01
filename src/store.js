import { reactive } from 'vue'

export const store = reactive({
    msg: "UN STORE",
    current_page: "HOME",
    isLogged: false,
    user: null
})