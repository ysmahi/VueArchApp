export function getNodeById (id, node) {
  // https://stackoverflow.com/questions/34903361/find-node-by-id-in-json-tree
  var reduce = [].reduce
  function runner (result, node) {
    if (result || !node) return result
    return node.id === id && node || // is this the proper node?
      runner(null, node.children) || // process this nodes children
      reduce.call(Object(node), runner, result) // maybe this is some ArrayLike Structure
  }
  return runner(null, node)
}
