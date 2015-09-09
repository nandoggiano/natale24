angular.module('starter.controllers', [])

.controller('LoginCtrl', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
    console.log('Login Controller Initialized');

    var ref = new Firebase($scope.firebaseUrl);
    /*
    ref.authAnonymously(function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            $state.go('splashpage');
        }
    });
    */
    var auth = $firebaseAuth(ref);

    $scope.signIn = function (user) {
        if (user && user.codice) {
            $ionicLoading.show({
                template: 'Collegamento al sito ...'
            });
            auth.$authWithPassword({
                email: "pippo@pippo.it",
                password: "pippo"
            }).then(function (authData) {
                console.log("Logged in as:" + authData.uid);
                ref.child("users").child(authData.uid).once('value', function (snapshot) {
                    var val = snapshot.val();
                    // To Update AngularJS $scope either use $apply or $timeout
                    $scope.$apply(function () {
                        $rootScope.displayName = val;
                    });
                });
                
                $ionicLoading.hide();
                ref.child(user.codice).once('value', function(snap) {
                    if (snap.val() === null) {
                        alert("Codice ("+user.codice+") errato\nInserisci \'pippo\'");
                    }
                    else {
                        $state.go('splashpage', {
                            codice: user.codice
                        });                    
                    }
                }); 

            }).catch(function (error) {
                alert("Authentication failed:" + error.message);
                $ionicLoading.hide();
            });
        } else
            alert("Inserisci un qualsiasi codice");
    }
    
})
.controller('SplashPageCtrl', function ($scope, $state, $interval,$firebase) {
    console.log('SplashPage Controller Initialized');
    //alert($state.params.codice);
    
    var ref = new Firebase($scope.firebaseUrl);
    ref.child($state.params.codice).child('url').once('value', function(snap) {
        $scope.url = snap.val();
    }); 

    var waiting;

    function nextPage()  {
        $interval.cancel(waiting);
        $state.go('palledinatale');
    }
    $scope.go = nextPage;
    
    waiting = $interval(nextPage, 10000);
    $scope.$on('$destroy', function() {
        $interval.cancel(waiting);
    });
})
.controller('PalleDiNataleCtrl', function ($scope, $state, $window) {
    console.log('PalleDiNatalePage Controller Initialized');
    
    var r = Math.random();

    $scope.palla01 = "img/palla1.png"
    $scope.palla02 = "img/palla2.png"
    $scope.palla03 = "img/palla3.png"
    $scope.palla04 = "img/palla4.png"
    $scope.palla05 = "img/palla5.png"
    $scope.palla06 = "img/palla6.png"
    $scope.palla07 = "img/palla7.png"
    $scope.palla08 = "img/palla8.png"
    $scope.palla09 = "img/palla9.png"
    $scope.palla10 = "img/palla1.png"
    $scope.palla11 = "img/palla2.png"
    $scope.palla12 = "img/palla3.png"
    $scope.palla13 = "img/palla4.png"
    $scope.palla14 = "img/palla5bn.png"
    $scope.palla15 = "img/palla6bn.png"
    $scope.palla16 = "img/palla7bn.png"
    $scope.palla17 = "img/palla8bn.png"
    $scope.palla18 = "img/palla9bn.png"
    $scope.palla19 = "img/palla1bn.png"
    $scope.palla20 = "img/palla2bn.png"
    $scope.palla21 = "img/palla3bn.png"
    $scope.palla22 = "img/palla4bn.png"
    $scope.palla23 = "img/palla5bn.png"
    $scope.palla24 = "img/palla6bn.png"

    $scope.openPage = function(num) {
        //$state.go('gioco',{num:num});
        $window.open("http://play.famobi.com/smarty-bubbles",'_self','location=no');
    }
})
.controller('GiocoCtrl',function($scope,$state,$location) {
    $location.path("http://www.google.com").replace();
    //$location.path("http://play.famobi.com/smarty-bubbles").replace();
    //$scope.src = ;
})
;
