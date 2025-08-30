export function checkCharacter(text: string, char: string) {
  if (!text || !char || char.length > 1)
    return "enter text and only one char to check";
  const hash = new Array(256).fill(0);
  const targetCode = char.charCodeAt(0);
  const tL = text.length;

  for (let i = 0; i < tL; i++) {
    //convert character to its ASCII/UNICODE
    const charCode = text.charCodeAt(i);

    //ensure code is valid within the hash array range
    if (charCode >= 0 && charCode < 256) {
      hash[charCode]++;
    }
    // console.log(hash[text[tL]])
  }
  if (targetCode < 256) {
    return `Occurance in text ${hash[targetCode]} and the ASCII/UNICODE ${targetCode}`;
  } else {
    return `Not found!`;
  }
}
export const checkCharacterCPP = `
#include <iostream>
#include <string>
using namespace std;

string checkCharacter(string text, char ch) {
    if (text.empty() || ch == '\\0') {
        return "enter text and only one char to check";
    }

    int hash[256] = {0};  // ASCII size
    int targetCode = (int) ch;

    for (int i = 0; i < text.length(); i++) {
        int code = (int)text[i];
        if (code >= 0 && code < 256) {
            hash[code]++;
        }
    }

    if (targetCode < 256) {
        return "Occurance in text " + to_string(hash[targetCode]) +
               " and the ASCII/UNICODE " + to_string(targetCode);
    } else {
        return "Not found!";
    }
}
`;
