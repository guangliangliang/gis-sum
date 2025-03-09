import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
    
const app = createApp(App)
import registerGlobalComponents from '@/config/registerGlobalComponents';

app.use(Antd)
app.use(router)
app.use(pinia)
registerGlobalComponents(app)

app.mount('#app')