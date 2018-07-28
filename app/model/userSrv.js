app.factory('userSrv', function ($http, $q) {

    // var activeUser = null;
    var activeUser = new User({id:"1", email: 'lior@lior.com'});



    function User(plainUser) {
        this.email = plainUser.email;
        this.id = plainUser.id
    }

    function isLoggedIn() {
        return activeUser ? true : false
    }

    function logout() {
        activeUser = null;
    }

    function login(email, password) {
        var async = $q.defer();
        var loginURL = 'https://json-server-heroku-ffwloyiqam.now.sh' + '/users?email=' + email + "&password=" + password
        $http.get(loginURL).then(function (response) {
            if (response.data.length > 0) {

                activeUser = new User(response.data[0]);
                async.resolve(activeUser);
            } else {
                async.reject('invalid Credentials');
            }
        }, function (err) {
            async.reject(err);
        });
        return async.promise;
    };

    function getActiveUser() {
        return activeUser;
    }

    return {
        login: login,
        isLoggedIn: isLoggedIn,
        logout: logout,
        getActiveUser: getActiveUser
    }
});