function disableConsole(shouldDisable=true) {
  if (shouldDisable) {
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {}
  }
}

module.exports = {
  disableConsole
}
