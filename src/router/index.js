import { createRouter, createWebHistory} from "vue-router";
import UserIdentification from "../views/UserIdentification";
import BookCatalog from "../views/BookCatalog";
import MyCart from "../views/MyCart";

const routes = [
    {
        path:'/UserIdentification',
        name:'UserIdentification',
        component: UserIdentification
    },
    {
        path:'/BookCatalog',
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