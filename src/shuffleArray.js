export function shuffleArray(array, n) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      if(i === n || j === n) continue;
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
      return array;
}  

export default shuffleArray