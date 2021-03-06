import template from './topnav.tpl.html'
import loginTemplate from './../login/login.tpl.html'

export default function topNav() {
  
  TopNavController.$inject = ['$scope', '$q', '$mdDialog','$mdSidenav', '$interval', 'dataservice','authservice', 'notificationservice', 'gmapservice'];
  /* @ngInject */
  function TopNavController($scope, $q, $mdDialog,$mdSidenav, $interval, dataservice, authservice, notificationservice, gmapservice) {
    var vm = this;
    vm.isAuthenticated = authservice.isAuthenticated();
    vm.username = vm.isAuthenticated? authservice.getUser(): 'Guest';
    var interval = 1000;
    activate();
  
    function activate() {
      $interval(function () {
        updateNotifications();
      }, interval);
    }

    var updateNotifications = function() {
      var notificationData = notificationservice.getNotifications();
      vm.notifications = [];
      for (var i = 0; i < notificationData.length; i++) {
        var notification = notificationData[i];
        vm.notifications.push(notification);
      }
    }
    
    vm.selectNotification = function(notification) {
      gmapservice.centerOn(notification.lat,notification.lon, 12);
    }
    
    vm.removeNotification = function(notification) {
      notificationservice.removeNotification(notification.id);
      return false;
    }
    
    vm.refreshCache = function() {
      localStorage.clear();
    }
    
    vm.login = function () {
      $mdDialog.show({
        scope: $scope,
        preserveScope: true,
        template: loginTemplate,
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    }
    
    vm.viewFilter = function() {
              $mdSidenav('right').open()
          .then(function () {
          });
    }
    
    vm.logout = function() {
      authservice.logout();
      vm.isAuthenticated = false;
      vm.username = '';
    }
    
    vm.openMenu = function(ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };   
  }
      
  return {
    bindToController: true,
    controller: TopNavController,
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      'navline': '='
    },
    template: template
  } 
}
