
// todo better algorithm
export default function generateUniqueID() {
  return Date.now().toString()
    + Math.floor((Math.random() * 1000) + 1000).toString();
}
