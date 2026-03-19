function hasRole(userRole, allowedRoles) {

  return allowedRoles.includes(userRole);

}

module.exports = { hasRole };