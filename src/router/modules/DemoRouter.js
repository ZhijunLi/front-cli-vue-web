import BaseAppLayout from "@/components/layouts/BaseAppLayout";

/**
 * 示例路由
 * @type {{}}
 */
const demoRouter = {
    path: '/demo',
    component: BaseAppLayout,
    children:[
        { path: 'index', name:'Demo', component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/Index')},
    ]

}
export default demoRouter
