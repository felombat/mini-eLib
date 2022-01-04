 (function(){
    var app = angular.module('eLib', []);

    app.controller("navCtrl", function($scope, $location){
        let vm = this; 
    });

    app.controller("eBooksCtrl", function($scope, $http ,checkLib){
            let vm = this; 

            vm.target = 'eLib';


            vm.updateTarget = function(folder){
                vm.target = folder;

                console.info("current Folder: ", vm.target); 

                $http.get('https://192.168.1.195/ebooks/api.php?folder=' + vm.target)
                    .then(function (resp, status) {
                        vm.ebooks = resp.data;
                    });

            }

            // vm.ebooks = ["myBook1.pdf", "myBook2.pdf"]; //service singleton eLibStore 
            $http.get('https://192.168.1.195/ebooks/api.php?folder=' + vm.target )
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
                $http.get('https://192.168.1.195/ebooks/api.php?folder=' + params)
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