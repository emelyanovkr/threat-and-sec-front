import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// todo: КИИ
//  Формирование отчета
//  сделать общий файл со стилями для элементов
//  радио, form-input, селектов, галочек и т. д.
//  разобраться более детально в том, как это работает
//  добавить ограничения на различных шагах и переходах между данными
createApp(App).use(store).use(router).mount("#app");
