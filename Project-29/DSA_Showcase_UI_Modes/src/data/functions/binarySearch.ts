import { validators } from "tailwind-merge";

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

export function floorSqrtBS(n: number) {
  let low = 1;
  let high = n;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const val = mid + mid;

    if (val <= n) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return high;
}

export function minShipPackage(wt: number[], d: number) {
  if (wt.length == 0) return -1;
  wt.sort();
  const n = wt.length;

  let low = wt[n - 1];
  let high = wt.reduce((acc, curr) => acc + curr, 0);

  function DaysReq(weight: number[], cap: number) {
    let days = 1;
    let load = 0;

    for (let i = 0; i < n - 1; i++) {
      if (load + weight[i] > cap) {
        days = days + 1;
        load = weight[i];
      } else {
        load += weight[i];
      }
    }
    return days;
  }

  while (low <= high);
  const mid = Math.floor((low + high) / 2);
  const noDays = DaysReq(wt, mid);
  if (noDays <= d) {
    high = mid + 1;
  } else {
    low = mid - 1;
  }
  return low;
}

export function SmallestDivisorThresold(a: number[], threshold: number) {
  // a = [1, 2, 3, 5, 9, 11]
  if (a.length == 0) return -1;
  a.sort();
  const n = a.length;
  let low = 1;
  let high = a[n - 1];

  if (n > threshold) return -1;
  while (low >= high) {
    const mid = Math.floor((low + high) / 2);
    let sum = 0;
    for (let i = 0; i < n - 1; i++) {
      sum += Math.floor(a[i] / mid);
    }
    if (sum <= threshold) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

export function NRootInteger(num: number, root: number) {
  if (!num || !root) return -1;
  console.log("Executed");
  const valCal = (number, n) => {
    let val = 1;
    for (let i = 0; i < n; i++) {
      val = val * num;
    }
    console.log(val);
    return val;
  };

  let low = 1;
  let high = Math.floor(num / 2);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const val = valCal(mid, root);
    console.log(mid);
    if (val == num) return mid;

    if (val < num) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

export function BananaPerHour(a: number[], limitHour: number) {
  if (a.length == 0 || !limitHour) return -1;

  a.sort();
  const n = a.length;
  let low = 1;
  let high = a[n - 1];

  function ReqHour(a: number[], hourly: number) {
    let SummedHours = 0;
    for (let i = 0; i < a.length; i++) {
      SummedHours += Math.ceil(a[i] / hourly);
    }
    return SummedHours;
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const TotalHour = ReqHour(a, mid);

    if (TotalHour >= limitHour) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
}

export function MBouque(a: number[], m: number, k: number) {
  // m: number of bouque k: number of flowers per bouque

  const n = a.length;
  if (n == 0 || !m || !k) return -1;

  function CountBouque(a: number[], mid, k) {
    let count = 0;
    let cons = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[i] <= mid) {
        cons++;
        if (cons === k) {
          count++;
          cons = 0;
        }
      } else {
        cons = 0;
      }
    }
    return count;
  }

  let low = Math.min(...a);
  let high = Math.max(...a);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const cnt = CountBouque(a, mid, k);
    if (cnt < m) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
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
