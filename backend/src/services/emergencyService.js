const emergencyModel = require("../models/emergencyAccessModel");

async function grantEmergencyAccess(user_id, patient_id, reason) {

  return await emergencyModel.requestAccess(user_id, patient_id, reason);

}

module.exports = { grantEmergencyAccess };