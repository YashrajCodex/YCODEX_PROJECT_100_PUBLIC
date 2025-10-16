import { sortArray } from "@/lib/helperFunctions";
import { ReverseArray } from "./recursion";
import { mergeSort } from "./sorting";

export function findTwoNumIndex(arr: number[], target: number) {
  if (arr.length === 0) return;
  const value: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        value.push(arr[i], arr[j]);
        return value.join(", ");
      }
    }
  }
}

export function findUniqueNum(numList: number[]): string {
  if (numList.length === 0 || typeof numList[0] === "string") return;
  const result_array = [];
  const seen_num = new Set<number>();

  for (let i: number = 0; i < numList.length; i++) {
    const last_Num = numList[i];
    if (seen_num.has(last_Num)) {
      result_array.push("_");
    } else {
      seen_num.add(last_Num);
      result_array.push(last_Num);
    }
  }
  return result_array.join(", ");
}

export function removeKElement(arr: number[], value: number) {
  const nums: number[] = [...arr];
  const val = value;
  let k = 0;

  console.log(arr, value);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return `${k}, ${nums}`;
}

export function getLongestCommonPrefix(arr: string[]) {
  const strArr = [...arr];

  if (!strArr.length) return "";

  let prefix = strArr[0];
  for (let i = 1; i <= strArr.length; i++) {
    while (strArr[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

export function findMissingNumInArr1toN(arr: number[], n: number) {
  //brute
  // for (let i = 0; i < arr.length; i++){
  //   let flag = 0;
  //   for (let j = 0; j < arr.length - 1; j++){
  //     if (arr[j] == i) {
  //       flag = 1;
  //       break;
  //     }
  //     if (flag == 0) return i;
  //   }
  // }

  //better
  // const hash = new Array(n + 1).fill(0);
  // for (let i = 0; i <= arr.length; i++){
  //   hash[arr[i]]++;
  // }

  // for (let j = 1; j <= arr.length + 1; j++){
  //   if (hash[j] === 0) {
  //     return `Missing num is ${j}`
  //   }
  // }

  //optimal
  //  method-1 (sum of n natural numbers: (n*(n+1))/2)
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return `${sum - Math.floor((n + 1 * (n + 1 + 1)) / 2)}`;

  //  method-2 (using XOR)
}

export function maxConsecutive1(nums: number[]) {
  let max = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      count++;
      max = max > count ? max : count;
    } else {
      count = 0;
    }
  }
  return `${max}`;
}

export function NumAppearsOnce(nums: number[]) {
  //  provide an array in which all the number appears twice but a single number appears once
  //  better
  // let max = nums[0];
  // //  checking for the max element in the array to create hash-map
  // for (let i = 1; i < nums.length; i++){
  //   if (max > nums[i]) {
  //     max = nums[i];
  //   }
  // }

  // const hash = new Array(max + 1).fill(0);
  // //  to store the entry of the number appearance
  // for (let i = 1; i <= nums.length; i++){
  //   hash[nums[i]]++;
  // }
  // for (let i = 1; i <= nums.length; i++){
  //   if (hash[i] === 1) {
  //     return i;
  //   }
  // }

  //  optimal

  let xor = 0;
  for (let i = 0; i < nums.length; i++) {
    xor = xor ^ nums[i];
  }
  return `${xor}`;
}

export function PlusOne(digits: number[]) {
  for (let i = digits.length - 1; i <= 0; i++) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits.join(", ");
    } else {
      digits[i] = 0;
    }
  }
  const newDigits = new Array(digits.length).fill(0);
  newDigits[0] = 1;
  return newDigits.join(", ");
}

export function MajorityElement(nums: number[]) {
  //  number that appears n/2 times

  //    brute
  //   for (let i = 0; i < nums.length; i++){
  //     let count = 0;
  //     for (let j = 0; j < nums.length; j++){
  //       if (nums[i] == nums[j]) {
  //         count ++
  //       }
  //     }
  //     if (count > Math.floor(nums.length / 2)) return nums[i];
  //   }
  //   return -1;
  //      time-complexity: O(n*n);

  //      better
  // const hashMap = new Array(nums.length + 1).fill(0);
  // for (let i = 0; i < nums.length; i++){
  //   hashMap[nums[i]]++;
  // }
  // for (let i = 1; i < nums.length; i++){
  //   if (hashMap[i] > Math.floor(nums.length / 2)) {
  //     return i;
  //   }
  // }
  //      time-complexity: O(nlogn + n);
  //      space-complexity: O(n);

  //      optimal
  let cnt = 0;
  let el: number;

  for (let i = 0; i < nums.length; i++) {
    if (cnt === 0) {
      cnt = 1;
      el = nums[i];
    } else if (nums[i] === el) {
      cnt++;
    } else {
      cnt--;
    }
  }
  //    time-complexity: O(n)
  //  if the array might not have a majority
  let cntL = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === el) {
      cntL++;
    }
  }
  if (cntL > Math.floor(nums.length / 2)) {
    return el;
  } else {
    return -1;
  }

  //  time-complexity: O(n+n)
}

export function checkIfSorted(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return `${false}`;
    }
  }
  return `${true}`;
}

export function theSecondLargest(nums: number[]) {
  let largest = nums[0];
  let secondL = -1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > largest) {
      largest = nums[i];
    } else if (nums[i] > secondL && nums[i] !== largest) {
      secondL = nums[i];
    }
  }
  return `Largest is: ${largest} & Second-largest is: ${secondL}`;
}

export function mergeTwoSortedArray(
  arr1: number[],
  arr2: number[],
  n: number,
  m: number
) {
  if (arr1.length !== n || arr2.length == m)
    return 'n and m are the corresponding size of arr1 and arr2. the size does n"t matched the given array';
  //    Brute
  // const arr3 = new Array(n + m).fill(0);
  // let left = 0;
  // let right = 0;
  // let index = 0;

  // while (left < n && right < m) {
  //   if (arr1[left] <= arr2[right]) {
  //     arr3[index] = arr1[left];
  //     index++;
  //     left++;
  //   }else{
  //     arr3[index] = arr2[right];
  //     index++;
  //     right++;
  //   }
  // }
  // while (left < n) {
  //   arr3[index++] = arr1[left];
  // }
  // while (right < m) {
  //   arr3[index++] = arr1[right];
  // }
  // for (let i = 0; i < n + m; i++){
  //   if (i < n) arr1[i] = arr3[i];
  //   else arr2[i - n] = arr3[i];
  // }

  //T.C: O(n+m) + O(n+m)
  //T.C: O(n+m)

  //optimal
  let left = 0;
  let right = n - 1;
  while (left >= 0 && right < m) {
    if (arr1[left] > arr2[right]) {
      const temp = arr1[left];
      arr1[right] = arr2[left];
      arr2[right] = temp;
      left--;
      right++;
    } else {
      break;
    }
  }
  mergeSort(arr1); //just the sorting function to sort the array
  mergeSort(arr2);
  //T.C: O(min(n, m)) + O(nLogn) + O(mlogm)
  //S.C: O(1)
  return `First array ${arr1} and second array ${arr2}`;
}

export function leftRotate(a: number[], d: number) {
  const temp = [...a];
  const n = a.length;
  const dPlaces = d % n;

  for (let i = dPlaces; i < n; i++) {
    a[i - dPlaces] = a[i];
  }
  for (let i = n - dPlaces; i < n; i++) {
    a[i] = temp[i - (n - dPlaces)];
  }

  // optimal

  return;
}

export function rearrangeArrayElements(nums: number[]) {
  const n = nums.length;
  const ans = new Array(n).fill(0);
  let posIndex = 0;
  let negIndex = 1;

  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) {
      ans[negIndex] = nums[i];
      negIndex += 2;
    } else {
      ans[posIndex] = nums[i];
      posIndex += 2;
    }
  }
  return ans.join(", ");
}

export function longestConsecutiveSequence(a: number[]) {
  const n = a.length;

  if (n === 0) return `no sequence found is 0`;
  const arr = Number(mergeSort(a));
  // let lastSmaller = Number.MIN_SAFE_INTEGER;
  let longest = 1;
  // let countCurr = 0;
  // Better
  // for (let i = 0; i < n; i++){
  //   if (arr[i] - 1 == lastSmaller) {
  //     countCurr++;
  //     lastSmaller = arr[i];
  //   } else if (arr[i] !== lastSmaller) {
  //     countCurr = 1;
  //     lastSmaller = arr[i];
  //   }
  //   longest = Math.max(longest, countCurr);
  // }
  // return `longest sequence found is ${longest}`

  //optimal

  const st = new Set();
  for (let i = 0; i < n; i++) {
    st.add(arr[i]);
  }
  for (const it of st) {
    if (!st.has((it as number) - 1)) {
      let countCurr = 1;
      let x = it as number;

      while (st.has(x + 1)) {
        x = x + 1;
        countCurr = countCurr + 1;
      }

      longest = Math.max(longest, countCurr);
    }
  }
  return `longest sequence found is ${longest}`;
}

export function NextPermutation(A: number[]) {
  let ind = -1;
  const n = A.length;

  for (let i = n - 2; i >= 0; i--) {
    if (A[i] < A[i + 1]) {
      ind = i;
      break;
    }
  }
  if (ind === -1) {
    ReverseArray(A);
    return A;
  }
  for (let i = n - 1; i > ind; i--) {
    if (A[i] > A[ind]) {
      const temp = A[i];
      A[i] = A[ind];
      A[ind] = temp;
    }
  }
  ReverseArray(A, ind + 1, A.length - 1);
  return `returned ${A.join(", ")}`;
}

export function MajorityElementNbyThreetimes(A: number[]) {
  // brute is linear searching
  // better sol is hashing

  let cnt1 = 0,
    cnt2 = 0;
  let el1 = Number.MIN_SAFE_INTEGER;
  let el2 = Number.MIN_SAFE_INTEGER;
  const n = A.length;

  for (let i = 0; i < n; i++) {
    if (cnt1 == 0 && el2 != A[i]) {
      cnt1 = 1;
      el1 = A[i];
    } else if (cnt2 == 0 && el1 != A[i]) {
      cnt2 = 1;
      el2 = A[i];
    } else if (A[i] == el1) cnt1++;
    else if (A[i] == el2) cnt1--;
    else {
      cnt1--;
      cnt2--;
    }
  }
  const ls = [];
  cnt1 = 0;
  cnt2 = 0;
  for (let i = 0; i < n; i++) {
    if (el1 == A[i]) cnt1++;
    if (el2 == A[i]) cnt2++;
  }

  const mini = Math.floor(n / 3) + 1;

  if (cnt1 >= mini) ls.push(el1);
  if (cnt2 >= mini) ls.push(el2);

  //for sorting
  if (ls[0] > ls[1]) {
    const temp = ls[0];
    ls[0] = ls[1];
    ls[1] = temp;
  }

  return ls;
}

export function MaxSubArrSum(a: number[]) {
  const n = a.length;
  let max = Number.MAX_SAFE_INTEGER;
  let sum = 0;
  let SubStart = -1;
  let SubEnd = -1;
  let start = 0;
  // Kadan's Algorithm

  for (let i = 0; i < n; i++) {
    if (sum == 0) {
      start = i;
    }
    sum += a[i];

    if (sum > max) {
      SubStart = start;
      SubEnd = i;
      max = sum;
    }

    if (sum < 0) {
      sum = 0;
    }
  }
  return max;
}

export function SearchInsertPosition(a: number[], target: number) {
  const n = a.length;

  for (let i = 0; i < n; i++) {
    if (a[i] === target) {
      return i + 1;
    } else if (a[i] > target) {
      return i - 1;
    } else {
      return n + 1;
    }
  }
}

export function SummaryRanges(nums: number[]) {
  const result = [];
  if (nums.length === 0) return result;

  let start = nums[0];
  for (let i = 1; i <= nums.length; i++) {
    if (i === nums.length || nums[i] !== nums[i - 1] + 1) {
      if (start === nums[i - 1]) {
        result.push(start.toString());
      } else {
        result.push(start + "->" + nums[i - 1]);
      }
      if (i < nums.length) start = nums[i];
    }
  }
  return result;
}

export function ArrayLeaders(nums: number[]) {
  //Brute force: TC: O(n*n), SC: O(n)

  //Optimal
  const n = nums.length;
  let max = Number.MIN_SAFE_INTEGER;
  const leaders: number[] = [];

  for (let i = n - 1; i >= 0; i--) {
    if (nums[i] > max) {
      max = nums[i];
      leaders.push(nums[i]);
    }
  }
  return leaders;
}

export function ThreeSum(nums: number[]) {
  const A: number[] = nums.sort();
  console.log(A);
  const ans: number[][] = [];

  for (let i = 0; i < A.length; i++) {
    if (i > 0 && A[i] == A[i - 1]) continue;
    let j = i + 1;
    let k = A.length - 1;

    while (j < k) {
      const sum = A[i] + A[j] + A[k];
      if (sum < 0) {
        j++;
      } else if (sum > 0) {
        k--;
      } else {
        const temp = [A[i], A[j], A[k]];
        ans.push(temp);
        j++;
        k--;
        while (j < k && A[j] == A[j - 1]) j++;
        while (j < k && A[k] == A[k + 1]) k--;
      }
    }
  }
  return ans;
}

export function FourSum(nums: number[], target: number) {
  const n = nums.length;
  const ans = [];
  nums.sort();
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    for (let j = i + 1; j < n; j++) {
      if (j > i + 1 && nums[j] == nums[j - 1]) continue;
      let k = j + 1;
      let l = n - 1;
      while (k < 1) {
        let sum = nums[i];
        sum += nums[j];
        sum += nums[k];
        sum += nums[l];
        if (sum == target) {
          const temp = [nums[i], nums[j], nums[k], nums[l]];
          ans.push(temp);
          k++;
          l--;
          while (k < l && nums[k] == nums[k - 1]) k++;
          while (k < l && nums[l] == nums[l + 1]) l--;
        } else if (sum < target) {
          k++;
        } else {
          l--;
        }
      }
    }
  }
  return ans;
}
export const findTwoNumIndexCPP = `
#include <iostream>
#include <vector>
using namespace std;

void findTwoNumsIndex(vector<int> arr, int target){
    for (int i = 0; i < arr.size(); i++){
        for (int j = i + 1; j < arr.size(); j++){
            if(arr[i] + arr[j] == target){
                cout << i << " " << j << endl;
                return;
            }
        }
    }
}
`;
export const findUniqueNumCPP = `
#include <iostream>
#include <vector>
#include <set>
#include <string>
using namespace std;

string findUniqueNum(vector<int> numList) {
    if (numList.empty()) return "";

    vector<string> result_array;
    set<int> seen_num;

    for (int num : numList) {
        if (seen_num.count(num)) {
            result_array.push_back("_");
        } else {
            seen_num.insert(num);
            result_array.push_back(to_string(num));
        }
    }

    string result = "";
    for (int i = 0; i < result_array.size(); i++) {
        result += result_array[i];
        if (i != result_array.size() - 1) result += ", ";
    }
    return result;
}
`;
export const removeKElementCPP = `
#include <iostream>
#include <vector>
using namespace std;

int removeKElement(vector<int>& arr, int value) {
    int k = 0;
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] != value) {
            arr[k] = arr[i];
            k++;
        }
    }
    return k;
}
`;
export const getLongestCommonPrefixCPP = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

string getLongestCommonPrefix(vector<string>& arr) {
    if (arr.empty()) return "";

    string prefix = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        while (arr[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length() - 1);
            if (prefix.empty()) return "";
        }
    }

    return prefix;
}
`;
export const MajorityElementCpp = `
#include <bits/stdc++.h>
using namespace std;

int majorityElement(vector<int> v){
  int cnt = 0;
  int else;
    for (int i = 0; i < v.size(); i++) {
      if (cnt == 0) {
        cnt = 1;
        el = v[i];
      } elseif(v[i] == el){
        cnt ++;
      }else {
        cnt--;
      }
    }
}
}
`;
export const NextPermutationCpp = `
#include <bits/stdc++.h>
using namespace std;

vector <int> nextGreaterPermutation(vector <int> &A){
  int ind = -1;
  int n = A.size();
  for(int i = n - 2; i >= 0; i--){
    if(A[i] < A[i + 1]){
      ind = i;
      break;
    }
  }
  
  if(ind == -1){
    reverse(A.begin(), A.end());
    return A;
  }
  
  for(int i = n-1; i > ind; i--){
    if(A[i] > A[ind]){
      swap(A[i], A[ind]);
    }
  }

  reverse(A.begin() + ind + 1, A.end());
  return A;
}
`;
export const MajorityElementN3timesCpp = `

  tc O(2n), sc O(1)
  #include <bits/stdc++.h>
  vector<int> majorityElementNbyfour(vector<int> v){
    int cnt1 = 0, cnt2 = 0;
    int el1 = INT_MIN;
    int el2 = INT_MIN;

    for(int i = 0; i < v.size(); i++){
      if(cnt1 == 0 && el2 != v[i]){
        cnt1 = 1;
        el1 = v[i];
      }else if(cnt2 == 0 && el1 != v[i]){
        cnt2 = 1;
        el2 = v[i];
      }else if(v[i] == el1) cnt1++;
      else if(v[i] == el2) cnt1--;
      else {
        cnt1--, cnt2--;
      }
    }
      vector<int> ls;
      cnt1 = 0, cnt2 = 0;
      for(int i = 0; i < v.size(); i++){
        if(el1 == v[i]) cnt1++;
        if(el2 == v[i]) cnt2++;
      }
      
      int mini = (int) (n/3) + 1;

      if(cnt1 >=mini) ls.push_back(el1);
      if(cnt2 >=mini) ls.push_back(el2);

      //for sorting
      if(ls[0] > ls[1]){
        int temp = ls[0];
        ls[0] = ls[1];
        ls[1] = temp;
      }

    return ls;
  }
`;
export const SummaryRangesCpp = `
#include <bits/stdc++.h>
using namespace std;

class Solution{
public:
  vector<string> summaryRanges(vector<int> & nums){
    vector<string> result;
    if(nums.empty()) return result;
    int start = nums[0];
    for(int i = 1; i <= nums.size(); i++){
      if(i == nums.size() || nums[i] != nums[i-1] + 1){
        if(start == nums[i - 1]){
          result.push_back(to_string(start));
        }else{
          result.push_back(to_string(start) + "->" + to_string(nums[i - 1]));  
        }
        if(i < nums.size()) start = nums[i];
      }
    }
      return result;
  }
};
`;
export const ThreeSumCPP = `
#include <bits/stdc++.h>
vector<vector<int>> triplet (int n, vector<int> &num){

  // better: TC:- O(n*n + log m), SC:- O(n + (no. of triplet))

  set<vector <int>> st;
  for(int i = 0; i < n; i++){
    set<int> hashSet;
    for(int j = i + 1; j < n; j++){
      int third = -(num[i] + num[j]);
      if(hashSet.find(third) != hashSet.end()){
        vector<int> temp = {num[i], num[j], third};
        sort(temp.begin(), temp(end));
      }
      hashSet.insert(num[j]);
    }
  }
  vector <vector<int>> ans{st.begin(), st.end()};
  return ans;

  //optimal

  vector< vector<int>> ans;
  sort(num.begin(), num.end());

  for(int i = 0; i < n; i++){
    if(i > 0 && num[i] == num[i - 1]) continue;
    int j = i + 1;
    int k = n - 1;

    while(j < k){
      int sum = num[i] + num[j] + num[k];
      if(sum < 0){
        j++;
      }else if(sum > 0){
        k--;
      }else{
        vector <int> temp = {num[i], num[j], num[k]};
        ans.push_back(temp);
        j++;
        k--;
        while(j < k && num[j] == num[j - 1]) j++;
        while(j < k && num[k] == num[k + 1]) k--;
      }
    }
  }
    return ans;
}
`;
export const FourSumCpp = `
#include <bits/stdc++.h>
vector<vector<int>> fourSum(vector<int>& nums, int target){
  int n = nums.size();
  vector<vector<int>> ans;
  sort(nums.begin(), nums.end());
  for(int i = 0; i < n; i++){
    if(i > 0 && nums[i] == nums[i - 1]) continue;
    for(int j = i + 1; j < n; j++){
      if(j > i + 1 && nums[j] == nums[j - 1]) continue;
      int k = j + 1;
      int l = n - 1;
      while(k < 1){
        long long sum = nums[i];
        sum += nums[j];
        sum += nums[k];
        sum += nums[l];
        if(sum == target){
          vector<int> temp = {nums[i], nums[j], nums[k], nums[l]};
          ans.push(temp);
          k++; l--;
          while(k < l && nums[k] == nums[k - 1]) k++;
          while(k < l && nums[l] == nums[l + 1]) l--;
        }else if(sum < target){
          k++;  
        }else{
          l--;
        }
      }
    } 
  }
  return ans;
}
`;
