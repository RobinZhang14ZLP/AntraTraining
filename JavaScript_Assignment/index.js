// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
function q1(num) {
    if (num === 0) return 0;
    let neg = false;
    if (num < 0) {
        neg = true;
        num *= -1;
    }
    let out = 0;
    while (num > 0) {
        let r = num % 10;
        num = Math.floor(num/10);
        out = out * 10 + r;
    }
    if (neg) out *= -1;
    return out;
}


// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g.,
// madam or nurses run.
function q2(word) {
    for (let i = 0; i < word.length/2; i++) {
        if (word.charAt(i) !== word.charAt(word.length-i-1)) return false;
    }
    return true;
}


// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 
function q3(word) {
    const out = []
    for (let i = 0; i < word.length; i++) {
        for (let j = i; j < word.length; j++) out.push(word.substring(i, j+1));
    }
    return out;
}


// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function q4(word) {
    word = word.toLowerCase();
    const m = new Map();
    for (let i = 0; i < word.length; i++) {
        const c = word.charAt(i);
        if (m.has(c)) m.set(c, m.get(c)+1);
        else m.set(c, 1);
    }
    let out = "";
    for (let i = 0; i < 26; i++) {
        const c = String.fromCharCode(97+i);
        if (m.has(c)) {
            for (let j = 0; j < m.get(c); j++) out += c;
        }
    }
    return out;
}


// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of
// each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function q5(sentence) {
    let out = "";
    for (let i = 0; i < sentence.length; i++) {
        if (i === 0) out += sentence.charAt(0).toUpperCase();
        else if (sentence.charAt(i-1) === " ") out += sentence.charAt(i).toUpperCase();
        else out += sentence.charAt(i);
    }
    return out;
}


// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word
// within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function q6(sentence) {
    const words = sentence.split(" ");
    let max = 0;
    let w = words[0];
    words.forEach(word => {
        if (word.length > max) {
            max = word.length;
            w = word;
        }
    });
    return w;
}


// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of
// vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as
// vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function q7(sentence) {
    let vowel = 0;
    const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
    for (let i = 0; i < sentence.length; i++) {
        if (vowels.includes(sentence.charAt(i))) vowel++;
    }
    return vowel;
}


// 8. Write a JavaScript function that accepts a number as a parameter and check the number is
// prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive
// divisors other than 1 and itself.
function q8(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num%i === 0) return false;
    }
    return true;
}


// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string,
// and undefined.
function q9(params) {
    return typeof(params);
}


// 10. Write a JavaScript function which returns the n rows by n columns identity matrix.
function q10(n) {
    const m = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            if (j === i) row.push(1);
            else row.push(0);
        }
        m.push(row);
    }
    return m;
}


// 11. Write a JavaScript function which will take an array of numbers stored and find the second
// lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 
function q11(nums) {
    if (nums.length < 2) return [undefined, undefined];
    const lim = [nums[0], nums[1], nums[1], nums[0]];
    if (nums[0] > nums[1]) {
        lim[1], lim[2] = nums[0];
        lim[0], lim[3] = nums[1];
    }
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] < lim[0]) {
            lim[1] = lim[0];
            lim[0] = nums[i];
        }
        else if (nums[i] < lim[1]) lim[1] = nums[i];
        if (nums[i] > lim[3]) {
            lim[2] = lim[3];
            lim[3] = nums[i];
        }
        else if (nums[i] > lim[2]) lim[2] = nums[i];
    }
    return [lim[1], lim[2]];
}


// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to
// the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the
// number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is
// half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1
// + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 +
// 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the
// perfect numbers 496 and 8128.
function q12(num) {
    if (num < 6) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num%i == 0) {
            sum += i;
            if (i !== Math.sqrt(num)) sum += num/i;
        }
    }
    if (sum === num) return true;
    else return false;
}


// 13. Write a JavaScript function to compute the factors of a positive integer. 
function q13(num) {
    if (num < 1) return undefined;
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num%i == 0) {
            factors.push(i);
            if (i !== Math.sqrt(num)) factors.push(num/i);
        }
    }
    return factors;
}


// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function q14(amount, coins) {
    const output = [];
    while (amount > 0) {
        let changed = false;
        for (let coin of coins) {
            while (amount >= coin) {
                output.push(coin);
                amount -= coin;
                changed = true;
            }
        }
        if (!changed) return undefined;
    }
    return output;
}


// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the
// bases. Accept b and n from the user and display the result. 
function q15(exp, base) {
    if (exp === 0) return 1;
    else if (exp === 1) return base;
    else{
        let b_neg = false;
        let e_neg = false;
        if (base < 0 && (exp%2 == 1 || exp%2 === -1)) b_neg = true;
        if (base < 0) base = -base;
        if (exp < 0) {
            exp = -exp;
            e_neg = true;
        }
        if (exp%2 == 0) {
            let result = q15(exp/2, base);
            if (e_neg) return 1/ (result*result);
            return result * result;
        }
        else {
            let result = q15((exp-1)/2, base);
            result = result * result * base;
            if (b_neg) result = -result;
            if (e_neg) result = 1/result;
            return result;
        }
    }
}


// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function q16(sentence) {
    const alphabets = new Set();
    let output = "";
    for (let i = 0; i < sentence.length; i++) {
        const c = sentence.charAt(i);
        if (!alphabets.has(c)) {
            output += c;
            alphabets.add(c);
        }
    }
    return output;
}


// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string.
function q17(sentence) {
    const output = [];
    for (let i = 0; i < sentence.length; i++) {
        const c = sentence.charAt(i);
        if (output[c] === undefined) output[c] = 1;
        else output[c] += 1;
    }
    return output;
}


// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds
// the desired value.
function q18(arr, num) {
    // arr is sorted
    // return index
    if (arr.length === 0) return null;
    if (arr.length === 1) return arr[0] === num ? 0 : null;
    let mid = arr.length/2;
    if (arr.length%2 == 1) mid = Math.floor(arr.length/2);
    if (num === arr[mid]) return mid;
    if (num > arr[mid]) { 
        const result = q18(arr.slice(mid), num);
        return result ? result+mid : result;
    }
    return q18(arr.slice(0, mid), num);
}


// 19. Write a JavaScript function that returns array elements larger than a number. 
function q19(arr, num) {
    const out = [];
    arr.forEach(n => {
        if (n > num) out.push(n);
    });
    return out;
}


// 20. Write a JavaScript function that generates a string id (specified length) of random characters.
// Sample   character   list:
// "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function q20(length) {
    let out = "";
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        out += char.charAt(Math.floor(Math.random(char.length) * 62));
    }
    return out;
}


// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2)
// combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function q21(arr, length) {
    const out = [];
    if (length < 0 || length > arr.length) return undefined;
    if (length === 0) return out;
    function fn(ar, len, i) {
        if (len === 1) {
            for (let j = i+1; j < arr.length; j++) {
                const add = ar.slice();
                add.push(arr[j]);
                out.push(add);
            }
        }
        else {
            for (let j = i+1; j < arr.length - len + 1; j++) {
                const add = ar.slice();
                add.push(arr[j]);
                fn(add, len-1, j);
            }
        }
    }
    const add = [];
    fn(add, length, -1);
    return out;
}


// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function
// will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o'
// Expected output: 3 
function q22(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === letter) count++;
    }
    return count;
}


// 23. Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function q23(str) {
    const letter = [];
    for (let i = 0; i < str.length; i++) {
        if (letter[str.charAt(i)]) letter[str.charAt(i)]++;
        else letter[str.charAt(i)] = 1;
    }
    for (let i = 0; i < str.length; i++) if (letter[str.charAt(i)] === 1) return str.charAt(i);
    return null;
}


// 24. Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple
// sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing
// each pair of adjacent items and swapping them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function q24(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = 1; j < arr.length-i; j++) {
            if (arr[j-1] < arr[j]) {
                const temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
            }
        }
    }
    return arr;
}


// 25. Write a JavaScript function that accept a list of country names as input and returns the
// longest country name as output. 
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
function q25(list) {
    let len = 0;
    let country = "";
    list.forEach(c => {
        if (c.length > len) {
            len = c.length;
            country = c;
        }
    });
    return country;
}


// 26. Write a JavaScript function to find longest substring in a given a string without repeating
// characters. 
function q26(str) {
    if (str.length < 2) return str;
    const s = new Set();
    let l = 0, r = -1;
    let word = "";
    let max = 0;
    let add = true;
    while (r < str.length-1) {
        if (add) {
            r++;
            if (s.has(str.charAt(r))) add = false;
            else {
                s.add(str.charAt(r));
                if (r-l+1 > max) {
                    max = r-l+1;
                    word = str.substring(l, r+1);
                }
            }
        }
        else {
            if (str.charAt(l) === str.charAt(r)) add = true;
            else s.delete(str.charAt(l));
            l++
        }
    }
    return word;
}


// 27. Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest
// symmetric factor problem is the problem of finding a maximum-length contiguous substring of a
// given string that is also a palindrome. For example, the longest palindromic substring of
// "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for
// example, in the string "abracadabra", there is no palindromic substring with length greater than
// three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all
// substrings that are themselves palindromes and cannot be extended to larger palindromic
// substrings) rather than returning only one substring or returning the maximum length of a
// palindromic substring.
function q27(str) {
    if (str.length < 2) return str;
    const palin = [];
    const pal = [0];
    palin.push(pal);
    let max = 1;
    let word = 0;
    for (let i = 1; i < str.length; i++) {
        const pal = [];
        for (let j of palin[i-1]) {
            if (j !== 0 && str.charAt(j-1) === str.charAt(i)) pal.push(j-1); 
        }
        if (str.charAt(i) === str.charAt(i-1)) pal.push(i-1);
        pal.push(i);
        palin.push(pal);
        if (i+1-pal[0] > max) {
            max = i+1-pal[0];
            word = pal[0];
        }
    }
    return str.substring(word, word+max);
}


// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function q28(cb, args) {
    // put callback function arguments as array in args
    return cb(...args);
}
q28(q29, [q28]);


// 29. Write a JavaScript function to get the function name.
function q29(cb) {
    return cb.name;
}

