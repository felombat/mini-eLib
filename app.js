 (function(){
    var app = angular.module('eLib', []);

     app.constant('config', {  
        apiUrl: 'http://192.168.1.195/ebooks/api.php', // https://localhost/ebooks/api.php
        baseUrl: 'http://192.168.1.195/ebooks/',       // https://localhost/ebooks
        enableDebug: true
     });
     
      app.constant('local_config', {  
        apiUrl:  'http://localhost/ebooks/api.php',
        baseUrl: 'http://localhost/ebooks',       // https://localhost/ebooks
        enableDebug: true
        });

    app.controller("navCtrl", function($scope, $location){
        let vm = this; 
    });

    app.controller("eBooksCtrl", function($scope, $http ,checkLib, config){
            let vm = this; 

        vm.target = "";
        vm.current_folder = '';

            vm.updateTarget = function(folder){
                vm.target = vm.current_folder = folder;

                //console.info("current Folder: ", vm.target); 

                $http.get(config.apiUrl + '?folder=' + vm.target)
                    .then(function (resp, status) {
                        vm.ebooks = resp.data;
                    });

            }

            // vm.ebooks = ["myBook1.pdf", "myBook2.pdf"]; //service singleton eLibStore 
            $http.get(config.apiUrl + '?folder=' + vm.target )
                .then(function(resp, status) {
                    vm.ebooks = resp.data;
                    });

            // checkLib.get('new')
            //     .success(function(reps, status){
            //         vm.ebooks = resp.data;
            //     });

    } );

    app.factory('checkLib',  ['$http', function($http) {
            return {
                get: function(params, callback) {
                $http.get(config.apiUrl +'?folder=' + params)
                    .success(function(data, status) {
                        callback(data, status);
                        })
                    .error(function(error, status) {
                        callback(error, status);
                        });
                }
            };
    }]);
})();