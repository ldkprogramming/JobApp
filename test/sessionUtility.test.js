const sessionUtility = require('../our_modules/sessionUtility')
describe("Session utility", () => {
    it('should check a user\'s role', () => {
        expect(sessionUtility.hasRole(
            {
                'email' : "test@gmail.com",
                'rolesIdMap' : {
                    'id' : 2,
                    'recruiterId' : 3
                }
            }, "recruiter"
        )).toBeTruthy();
        expect(sessionUtility.hasRole(
            {
                'email' : "test@gmail.com",
                'rolesIdMap' : {
                    'id' : 2,
                }
            }, "recruiter"
        )).toBeFalsy() ;
    });
});