const str = '2342243294432;;sd223rfds+3232.-131.92 ';
const lastNumber = str.match(/-?\d+(\.\d+)?(?=\s*$)/);

console.log(lastNumber ? lastNumber[0] : ''); 
