// function filteredArray(arr, elem) {
//     let newArr = [];
//     // Only change code below this line
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr[i].length; j++) {
//             if (arr[i][j] == elem) {
//                 arr.shift();
//                 i--;
//                 break;
//             }
//         }
//     }
//     // Only change code above this line
//     return arr;
// }

// console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));

// //   // console.log([[1,2,3],[100,200,300],[110,120,130]].slice(1,3));
// function filteredArray(arr, elem) {
//     // Only change code below this line
//     for (let i = 0; i < arr.length; i++) {
//         // console.log("inside while")
//         for (let j = 0; j < arr[i].length; j++) {
//             if (arr[i][j] == elem) {
//                 // console.log(arr[i]);
//                 arr.splice(i, 1);
//                 i--;
//                 break;
//             }
//         }
//     }
//     // Only change code above this line
//     return arr;
// }
// console.log(filteredArray([[10, 8, 3], [14, 6, 23], [3, 18, 6]], 18));
let abc = { a: 1, b: 2 };
let a1 = Object.keys(abc);