import { StackArray } from "./stack";

export function balancedParanthesis(str: string) {
  const st = new StackArray(str.length);
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(" || str[i] == "{" || str[i] == "[") {
      st.pushStArr(str[i]);
    } else if (st.isEmptyStArr()){
        return false;
    }else {
      const char = st.peekStArr();
      st.popStArr();
      if (str[i] == ")" && char == "(") {
        return true;
      } else if (str[i] == "}" && char == "{") {
        return true;
      } else if (str[i] == "]" && char == "[") {
          return true
      } else {
          return false
      }
    }
    }
    return st.isEmptyStArr();
}
