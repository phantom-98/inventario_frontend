const checkUserPermissions = (userProfile,routeGuard) => {
    if (routeGuard.includes(userProfile)) {
        return true
      } else {
        return false
      }
}

export default checkUserPermissions