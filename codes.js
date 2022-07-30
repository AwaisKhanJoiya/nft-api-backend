const coupons = [];
const a_z = ["a", "b", 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z']


// Shuffler
function shuffleWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}


// Coupon Code generator
const generateCoupons = (n) => {

    for (var i=0; i < n; i++) {
       let temp;
       const randInt = Math.round(Math.random() * 200000) + 1234567
       temp = randInt.toString()
      
      let randomStr = ''
      for(let j=0; j < 5; j++) {
        const randInt2 = Math.round(Math.random() * 50)
        randomStr += a_z[randInt2]
      }

      temp += randomStr 
      temp = shuffleWord(temp)
      coupons.push(temp)
    }
}

generateCoupons(2000)
module.exports = coupons;


