export function FirstBadVersion(n: number, badVersion: number) {
  //here instead of dedicated function for bad version testing, the parameter just accepts a number that can be considered the expected bad version before hand. just a function to express the logic
  let left = 1;
  let right = n;
  let firstBadVersion = n;

  while (left <= right) {
    const mid = Math.floor((left + (right - left)) / 2);
    if (mid === badVersion) {
      firstBadVersion = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return firstBadVersion;
}

export function TimesArrayRotated(a: number[]) {
  let low = 0;
  let high = a.length - 1;
  let ans = Number.MAX_SAFE_INTEGER;
  let index = -1;

  while (low <= high) {
    const mid = (low + high) / 2;

    if (a[low] <= a[high]) {
      if (a[low] < ans) {
        index = low;
        ans = a[low];
      }
      break;
    }

    if (a[low] <= a[mid]) {
      if (a[low] < ans) {
        index = low;
        ans = a[low];
      }
      low = mid + 1;
    } else {
      high = mid - 1;
      if (a[mid] < ans) {
        index = mid;
        ans = a[mid];
      }
    }
  }
  return index;
}

export function Lower_Upperbound(nums: number[], k: number) {
  if (nums?.length == 0) return 0;
  nums.sort();

  const n = nums.length;
  let low = 0;
  let high = n - 1;
  let ans = n;
  // lower bound can actually be used for finding a ceil in an sorted array. Smallest number greater than k/target.
  //while floor is Largest number smaller than k/target
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] >= k) {
      //upperbound is nums[mid] >= k
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}

export function floorCeil(type: string, a: number[], k: number) {
  if (a.length == 0) return -1;
  a.sort();
  const n = a.length;
  let low = 0;
  let high = n - 1;
  let ans = -1;
  // lower bound can actually be used for finding a ceil in an sorted array. Smallest number greater than k/target.
  //while floor is Largest number smaller than k/target
  switch (type) {
    case "floor":
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] >= k) {
          ans = ans[mid];
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
      break;

    default:
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] <= k) {
          //upperbound is nums[mid] >= k
          ans = ans[mid];
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      break;
  }
  return ans;
}

export function occuranceFirstLastCount(nums: number[], target: number) {
  if (nums.length == 0) return 0;
  nums.sort();
  // Optimal
  let firstOcc = -1;
  let lastOcc = -1;
  let count = 0;
  const n = nums.length;

  let low = 0;
  let high = n - 1;
  //to find the first occurance
  //[1, 3, 4, 5, 6, 6, 6, 6, 7, 8, 11, 15]
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] >= target) {
      high = mid - 1;
      firstOcc = mid;
    } else {
      low = mid + 1;
    }
  }
  //to find the last occurance
  //[1, 3, 4, 5, 6, 6, 6, 6, 7, 8, 11, 15]
  low = 0;
  high = n - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] <= target) {
      lastOcc = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  count = lastOcc - firstOcc + 1;
  return [firstOcc, lastOcc, count];
}

export function searchElementInRoatedSortedArr(nums: number[], target: number) {
  if (nums.length == 0) return -1;

  const n = nums.length;
  let low = 0;
  let high = n - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] == target) return mid;
    if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
      low++;
      high--;
      continue;
    }
    if (nums[low] <= nums[mid]) {
      if (nums[low] <= target && target <= nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (nums[mid] <= target && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}

export function minRotaSortArr(a: number[]) {
  if (a.length == 0) return -1;
  const n = a.length;

  let low = 0;
  let high = n - 1;
  let ans = Number.MAX_SAFE_INTEGER;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (a[low] <= a[high]) {
      ans = Math.min(ans, a[low]);
      break;
    }

    if (a[low] <= a[mid]) {
      ans = Math.min(ans, a[low]);
      low = mid + 1;
    } else {
      ans = Math.min(ans, a[mid]);
      high = mid - 1;
    }
  }
  return ans;
}

export function singleElement(a: number[]) {
  a.sort();
  //find the element that appears once in an sorted array where all the elements appears twice.

  const n = a.length;

  if (n == 1) return a[0];

  if (a[0] != a[1]) return a[0];
  if (a[n - 1] != a[n - 2]) return a[n - 1];

  let low = 1;
  let high = n - 2;

  // if index is (even, odd) then it is the left half of the single element
  // if index is (odd, even) then it is the right half of the single element
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    //search for the single element
    if (a[mid] != a[mid] + 1 && a[mid] != a[mid] - 1) return a[mid];
    // the formula below checks for (even, odd) index = left half
    if (
      (mid % 2 == 1 && a[mid - 1] == a[mid]) ||
      (mid % 2 == 0 && a[mid] == a[mid + 1])
    ) {
      low = mid + 1;
      // the formula below checks for (even, odd) index = left half
    } else {
      high = mid - 1;
    }
  }
  return -1; //dummy return in case no single element is not found
}
export function PeakElement(a: number[]) {
  const n = a.length;
  if (n == 0) return -1;
  if (n == 1) return a[0]; // only element is always a peak element
  
  if (a[0] > a[1]) return a[0]; // if the first element is greater than the second element then it is also a peak element assuming -infinity out-off-bounds.
  if (a[n - 1] > a[n - 2]) return a[n - 1]; // if the last element is greater than the second last then it is also a peak element assuming -infinity out-off-bounds.

  let low = 1;
  let high = n - 2;

  while (low >= high) {
    const mid = Math.floor((low + high) / 2);

    // Returns if found the peak element preventing further checks
    if (a[mid] > a[mid - 1] && a[mid] > a[mid + 1]) {
      return a[mid];
    }
    //if the left element is smaller than the mid, then we will not find the peak element on the left side. Hence eliminate the left side. If the case reverts, the high side will be eliminated.
    if (a[mid] > a[mid - 1]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  //dummy return if no peak element is found which will never be executed.
  return -1;
}
export const FirstBadVersionCpp = `
class Solution{
    public:
        int firstBadVersion(int n){
            int left = 1;
            int right = n;
            int firstBad = n;
            while(left <= right){
                    //calculating mid-point using left + (right - left)/2 to prevent integer overflowing;
                int mid = left + (right - left) / 2;
                if(isBadVersion(mid)){
                    firstBad = mid;
                    right = mid - 1;
                }else{
                    left = mid + 1;
                }
            }
            return firstBad;
        }    
}`;
