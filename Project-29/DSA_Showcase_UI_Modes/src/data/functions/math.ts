export function findNumDivisors(n: number) {
    const divisors:number[] = [];
    for (let i = 0; i <= n; i++){
        if (n % i === 0) {
            divisors.push(i);
        }
    }
    return divisors.join(", ");
}
export function findPrimeNum(n:number) {
    let found: boolean = true;
    for (let i = 2; i * i < n; i++){
        if (n % i === 0) {
            found = false;
            // console.log("not a prime num");
            break;
        }
    }
    return `${found}`
}
export function fibonacciSeries(n: number) {
    const toDisplayArray = [0, 1]
    if (n == 0) {
        //this a custom box to display output
        return (`The fibonacci series upto ${n}th term is 0`)
    } else {
        let secondLast = 0;
        let last = 1; 
        // console.log(`The fibonacci series upto: ${n}th term is `)
        // console.log(`${secondLast}`)
        // console.log(`${last} `)
        let curr:number;
        for (let i = 0; i <= n; i++){
            curr = last + secondLast;
            secondLast = last;
            last = curr;
            // console.log(curr, " ")
            toDisplayArray.push(curr)
        }
       return (`The fibonacci series upto ${n}th term is ${toDisplayArray.join(", ")}`)
    }
}
export function isPalindrome(text: string) {
    //Removing space from the text 
    const clrText = text.split(" ").join("");
    const firstIndex: number = 0;
    const lastIndex: number = clrText.length

    // Method 1
    // let left = 0;
    // let right = clrText.length;

    // while(left < right){
    //     if (clrText[left] != clrText[right]) {
    //         return false
    //     }
    //     left++;
    //     right++;
    // }
    // return true;

    //Method 2 (using RECURSION)
    function PalindromeRecursion(clrStr: string, firstIndex: number, lastIndex: number) {
        if (firstIndex >= lastIndex) {
            return true;
        }    
        if (clrStr[firstIndex] == clrStr[lastIndex]) {
            PalindromeRecursion(clrStr, firstIndex + 1, lastIndex - 1);
        } else {
            return false
        }
    }

    //calling the recurrsion function in the parent function
    return `${PalindromeRecursion(clrText, firstIndex, lastIndex)}`;
}

export const findNumDivisorsCPP = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

string findNumDivisors(int n) {
    vector<int> divisors;
    for (int i = 1; i <= n; i++) { // start from 1 to avoid division by 0
        if (n % i == 0) {
            divisors.push_back(i);
        }
    }

    string result = "";
    for (int i = 0; i < divisors.size(); i++) {
        result += to_string(divisors[i]);
        if (i != divisors.size() - 1) result += ", ";
    }
    return result;
}
`;

export const findPrimeNumCPP = `
#include <iostream>
using namespace std;

bool findPrimeNum(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
`;

export const fibonacciSeriesCPP = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

string fibonacciSeries(int n) {
    if (n == 0) {
        return "The fibonacci series upto 0th term is 0";
    }

    vector<int> toDisplayArray = {0, 1};
    int secondLast = 0, last = 1, curr;

    for (int i = 0; i < n; i++) {
        curr = last + secondLast;
        secondLast = last;
        last = curr;
        toDisplayArray.push_back(curr);
    }

    string result = "The fibonacci series upto " + to_string(n) + "th term is ";
    for (int i = 0; i < toDisplayArray.size(); i++) {
        result += to_string(toDisplayArray[i]);
        if (i != toDisplayArray.size() - 1) result += ", ";
    }

    return result;
}
`;

export const isPalindromeCPP = `
#include <iostream>
#include <string>
using namespace std;

string removeSpaces(string str) {
    string result = "";
    for (char c : str) {
        if (c != ' ') result += c;
    }
    return result;
}

bool PalindromeRecursion(string& str, int firstIndex, int lastIndex) {
    if (firstIndex >= lastIndex) return true;
    if (str[firstIndex] != str[lastIndex]) return false;
    return PalindromeRecursion(str, firstIndex + 1, lastIndex - 1);
}

bool isPalindrome(string text) {
    string clrText = removeSpaces(text);
    return PalindromeRecursion(clrText, 0, clrText.length() - 1);
}
`;