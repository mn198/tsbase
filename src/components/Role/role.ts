const AccessControl = require('accesscontrol');
const ac = new AccessControl();

export const roles = (function () {
    ac.grant('basic')
        .readOwn('user')
        .updateOwn('user')
        .readOwn('pattern');
    ac.grant('pro').extend('basic').readAny('user');
    ac.grant('admin').extend('basic').extend('pro').updateAny('user').deleteAny('user');
    return ac;
})();
