const session = require('express-session');

module.exports = {
    hasRole: (currentSession, role) => {
        if (currentSession.rolesIdMap.id !== null) {
            switch (role) {
                case "applicant" : {
                    return currentSession.rolesIdMap.applicantId != null;
                }
                case "recruiter" : {
                    return currentSession.rolesIdMap.recruiterId != null;
                }
                case "admin" : {
                    return currentSession.rolesIdMap.adminId != null;
                }
            }
        }
        return false;
    },
    isLoggedIn: (currentSession) => {
        return (currentSession.rolesIdMap!== undefined)
    }
}