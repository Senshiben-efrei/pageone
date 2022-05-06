import { createRouter, createWebHistory} from "vue-router";
import SignUp from "../views/SignUp";
import SignIn from "../views/SignIn";
import BookCatalog from "../views/BookCatalog";
import MyCart from "../views/MyCart";

const routes = [
    {
        path:'/SignUp',
        name:'SignUp',
        component: SignUp
    },
    {
        path:'/SignIn',
        name:'SignIn',
        component: SignIn
    },
    {
        path:'/',
        name:'BookCatalog',
        component: BookCatalog
    },
    {
        path:'/MyCart',
        name:'MyCart',
        component: MyCart
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router