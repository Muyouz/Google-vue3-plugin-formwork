import { createApp } from 'vue'
import App from '@/content-scripts/App.vue';
import store from '@/content-scripts/store'; // VueX 酌情考虑是否使用
import ElementPlus from 'element-plus'; // vue3 中需使用 ElementPlus
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //载入element plus icon


document.addEventListener('DOMContentLoaded', function () {

	const div = document.createElement('div');
    div.id = 'content-div';
    document.body.appendChild(div);

    const app = createApp(App);

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }

    app.use(store)
        .use(ElementPlus, { zIndex: 1000021 })
        .mount('#content-div'); 
});