import Vue from 'vue';
import {formDate} from './../utils/util.js';
//日期转换
Vue.filter('date',function(value,formdate){
    return formDate(value,formdate);
})