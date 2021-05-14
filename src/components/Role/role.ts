const AccessControl = require('accesscontrol');
const ac = new AccessControl();

export const roles = (function () {
    ac.grant('basic')
        .readOwn('user')
        .updateOwn('user')
        .deleteOwn('user')
        .readOwn('pattern')
        .updateOwn('pattern')
        .deleteOwn('pattern');

    ac.grant('pro').extend('basic')
        .readAny('user')
        .readAny('pattern');

    ac.grant('admin').extend('basic').extend('pro')
        .updateAny('user')
        .deleteAny('user')
        .updateAny('pattern')
        .deleteAny('pattern')

    return ac;
})();
