import angular from 'angular';

import { routing } from './filter.config.js';
import FilterCtrl from './filter.ctrl.js';


export default angular.module('app.filter', [])
  .config(routing)
  .controller('FilterCtrl',FilterCtrl)
  .name;