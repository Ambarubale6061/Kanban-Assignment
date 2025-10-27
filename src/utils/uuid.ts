export function v4() {
  // simple random id (not RFC compliant) for demo/build purposes
  return 'id-' + Math.random().toString(36).slice(2, 9)
}
