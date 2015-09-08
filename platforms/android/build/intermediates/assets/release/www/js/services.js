angular.module('starter.services', ['firebase'])

.factory("Auth", ["$firebaseAuth", "$rootScope",function ($firebaseAuth, $rootScope) {
    var ref = new Firebase(firebaseUrl);
    return $firebaseAuth(ref);
}])
.factory('Splash', function ($firebase) {
    // Might use a resource here that returns a JSON array
    var ref = new Firebase(firebaseUrl);
    var splashes = $firebase(ref.child('splashes')).$asArray();

    return {
        get: function (codice) {
            // Simple index lookup
            return splashes.$getRecord(codice);
        }
    }
});
