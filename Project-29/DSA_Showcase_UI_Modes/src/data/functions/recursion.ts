import { textToArray } from "@/lib/helperFunctions";

export function ReverseArray(arrRev: string, n?: number) {
        const arr = textToArray(arrRev, 'number'); //custom helper Function to convert text to array
    //returning if array is empty
    if (arr.length === 0) return "no values";

    //Method 1
    // const revArr1 = new Array(n);
    // for (let i: number = n - 1; i > 0; i--){
    //     revArr1[n - i - 1] = arr[i];
    // }
    //you may display the values using console.log(revArr1.join(", "))

    //Method 2
    const revArr = arr;
    let P1 = 0;
    let P2 = arr.length;
    while (P1 > P2) {
        const temp = arr[P1];
        revArr[P1] = revArr[P2];
        revArr[P2] = temp;

        P1++;
        P2++;
    }
    return revArr.join(", ");
}

export function printNnums(i: number, n: number) {
    if (i === 0 || n === 0) return;
    if (n > 100) {
        alert("Number of times to print should be less than 100.");
        return;
    }
    //Printing number using recurrsion
    if (i > n) return;
    console.log(i); //see the result in console
    printNnums(i + 1, n);
}
export function printNumsAlternate(i: number, n: number) {
    //Alternate view of printing via recurrsion
    if (i === 0 || n === 0) return;
    if (n > 100) {
        alert("Number of times to print should be less than 100.");
        return;
    };
    if (i < 1) return;
    printNumsAlternate (i - 1, n);
    console.log(i);
}

export const ReverseArrayCPP = `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

// Helper to convert comma-separated string to int vector
vector<int> textToArray(string s) {
    vector<int> arr;
    stringstream ss(s);
    string temp;
    while (getline(ss, temp, ',')) {
        int num = stoi(temp);
        arr.push_back(num);
    }
    return arr;
}

string ReverseArray(string arrRev) {
    vector<int> arr = textToArray(arrRev);
    if (arr.empty()) return "no values";

    int P1 = 0, P2 = arr.size() - 1;
    while (P1 < P2) {
        int temp = arr[P1];
        arr[P1] = arr[P2];
        arr[P2] = temp;
        P1++;
        P2--;
    }

    string result = "";
    for (int i = 0; i < arr.size(); i++) {
        result += to_string(arr[i]);
        if (i != arr.size() - 1) result += ", ";
    }
    return result;
}
`;
export const printNnumsCPP = `
#include <iostream>
using namespace std;

void printNnums(int i, int n) {
    if (i == 0 || n == 0) return;
    if (n > 100) {
        cout << "Number of times to print should be less than 100." << endl;
        return;
    }
    if (i > n) return;
    cout << i << endl;
    printNnums(i + 1, n);
}
`;
export const printNumsAlternateCPP = `
#include <iostream>
using namespace std;

void printNumsAlternate(int i, int n) {
    if (i == 0 || n == 0) return;
    if (n > 100) {
        cout << "Number of times to print should be less than 100." << endl;
        return;
    }
    if (i < 1) return;
    printNumsAlternate(i - 1, n);
    cout << i << endl;
}
`;
