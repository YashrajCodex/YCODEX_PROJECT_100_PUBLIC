import { StackArray } from "./stack";

export function balancedParanthesis(str: string) {
  if(!str) return "Empty argument"
  const st = new StackArray(str.length);
  //  {{[)})}
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(" || str[i] == "{" || str[i] == "[") {
      st.pushStArr(str[i]);
    }else {
      if (!st.isEmptyStArr()) {
        const char = st.peekStArr();
        if (str[i] == ")" && char == "(") {
          st.popStArr();
        } else if (str[i] == "}" && char == "{") {
          st.popStArr();
        } else if (str[i] == "]" && char == "[") {
          st.popStArr();
        } else if (str[i] == '}' || str[i] == ']' || str[i] == ')') {
          return false;
        }
      }
    }
  }
  return st.isEmptyStArr();
}

export function longestSubstringWithoutRepeatingChar(s: string) {
  const hashSt = new Array(256).fill(-1);
  const n = s.length;
  let left = 0;
  let right = 0;
  let max = 0;
  while (right < n) {
    // if to check if it is not in the map
    if (hashSt[s[right]] !== -1) {
      if (hashSt[s[right]] >= left) {
        left = hashSt[s[right]] + 1;
      }
    }
    const length = right - left + 1;
    max = Math.max(length, max);

    hashSt[s[right]] = right;
    right++;
  }
  return max;
  //tc O(n) sc O(n)
}
export function FirstOccurrenceString(needle: string, haystack: string) {
  //Returns the indexof the first occurrence in a String
  if (needle === "") return 0;
  for (let i = 0; i < haystack.length - needle.length; i++) {
    if (haystack.substring(i, i + needle.length) === needle) {
      return i;
    }
  }
  return -1;
}

export function PrefixInfixPostfix(s:string, func: string) {
  function priority(char: string) {
    switch (char) {
      case "^":
        return 3;
      case "*":
        return 2;
      case "/":
        return 2;
      case "+":
        return 1;
      case "-":
        return 1;
      default:
        return -1;
    }
  }
  let i = 0;
  const st = new StackArray(s.length);
  let ans = "";
  const n = s.length;

  //Infix to Postfix
  //tc: O(n) + O(n) sc: O(n) + O(n)
  function InfixToPostfix(str:string) {
    while (i < n) {
      if (
        (str[i] >= "A" && str[i] <= "Z") ||
        (str[i] >= "a" && str[i] <= "z") ||
        (Number(str[i]) >= 0 && Number(str[i]) <= 9)
      ) {
        ans = ans + str[i];
      } else if (str[i] == "(") {
        st.pushStArr(str[i]);
      } else if (str[i] == ")") {
        while (!st.isEmptyStArr() && st.peekStArr() != "(") {
          ans += st.peekStArr();
          st.popStArr();
        }
        st.popStArr();
      } else {
        while (
          !st.isEmptyStArr() &&
          priority(str[i]) <= priority(st.peekStArr() as string)
        ) {
          ans += st.peekStArr();
          st.popStArr();
        }
        st.pushStArr(s[i]);
      }
      i++;
    }
    while (st.isEmptyStArr()) {
      ans = ans + st.peekStArr();
      st.popStArr();
    }
  }

  switch (func) {
    case 'InfixToPostfix':
      InfixToPostfix(s);
      break;
    default:
      break;
  }
  return ans;
}
