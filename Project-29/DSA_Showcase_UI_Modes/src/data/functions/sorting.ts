import { swap } from "@/lib/helperFunctions";

export function SelectionSort(array: number[]) {
  if(array.length === 0) return 'Enter a valid array'
  const arr = [...array];
  const n = arr.length;
  for (let i = 0; i <= n - 2; i++) {
    let mini = i;
    for (let j = i; j <= n - 1; j++) {
      if (arr[j] < arr[mini]) {
        mini = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[mini];
    arr[mini] = temp;
  }
  return arr;
}

export function insertionSort(array: number[]) {
  const sortedArray = [...array];
  for (let i = 0; i <= sortedArray.length - 1; i++) {
    let j = i;
    while (j > 0 && sortedArray[j - 1] > sortedArray[j]) {
      const temp = sortedArray[j - 1];
      sortedArray[j - 1] = sortedArray[j];
      sortedArray[j] = temp;
      j--;
    }
  }
}

export function bubbleSort(array: number[]) {
  const sortarray = [...array];
  const n = sortarray.length;
  for (let i = n - 1; i >= 0; i--) {
    let alreadySorted = 0;
    for (let j = 0; j < i - 1; j++) {
      if (sortarray[j] > sortarray[j + 1]) {
        alreadySorted = 1;
        const temp = sortarray[j];
        sortarray[j] = sortarray[j + 1];
        sortarray[j + 1] = temp;
      }
    }
    if (alreadySorted === 0) {
      break;
    }
  }
  return sortarray;
}

export function mergeSort(array: number[]) {
  if (array.length === 0) return;
  const sortArray = [...array];
  const n = sortArray.length;

  function mergeSortRecursion(arr: number[], low: number, high: number) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);
    mergeSortRecursion(arr, low, mid);
    mergeSortRecursion(arr, mid + 1, high);

    const temp = [];
    let left = low;
    let right = mid + 1;
    while (left <= mid && right <= high) {
      if (arr[left] <= arr[right]) {
        temp.push(arr[left]);
        left++;
      } else {
        temp.push(arr[right]);
        right++;
      }
    }
    while (left <= mid) {
      temp.push(arr[left]);
      left++;
    }
    while (right <= high) {
      temp.push(arr[right]);
      right++;
    }
    for (let i = low; i <= high; i++) {
      arr[i] = temp[i];
    }
  }
  mergeSortRecursion(sortArray, 0, n);
  return sortArray.join(", ");
}

export function quickSort(array: number[]) {
  if (array.length === 0) return;
  const quickSortArray = [...array];
  function partition(arr: number[], low: number, high: number) {
    const pivot = arr[low];
    let i = low;
    let j = high;

    while (i < j) {
      while (arr[i] <= pivot && i <= high - 1) {
        i++;
      }
      while (arr[j] > pivot && j >= low - 1) {
        j--;
      }
      if (i < j) swap(arr[i], arr[j]);
    }
    swap(arr[low], arr[j]);
    return j;
  }
  function qs(array: number[], low: number, high: number) {
    if (low < high) {
      const pIndex = partition(array, low, high);
      qs(array, low, pIndex - 1);
      qs(array, pIndex + 1, high);
    }
  }
  qs(quickSortArray, 0, quickSortArray.length - 1);
  return quickSortArray.join(", ");
}

export const selectionSortCPP = `
#include <iostream>
#include <vector>
using namespace std;

// Selection Sort
string selectionSort(vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i <= n - 2; i++) {
        int mini = i;
        for (int j = i; j <= n - 1; j++) {
            if (arr[j] < arr[mini]) {
                mini = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[mini];
        arr[mini] = temp;
    }

    string result = "";
    for (int i = 0; i < n; i++) {
        result += to_string(arr[i]);
        if (i != n - 1) result += ", ";
    }
    return result;
}`;
export const insertionSortCPP = `
#include <iostream>
#include <vector>
using namespace std;

// Insertion Sort
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        int j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            int temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;
            j--;
        }
    }
}
`;
export const bubbleSortCPP = `
#include <iostream>
#include <vector>
using namespace std;

// Bubble Sort
vector<int> bubbleSort(vector<int> arr) {
    int n = arr.size();
    for (int i = n - 1; i >= 0; i--) {
        bool alreadySorted = true;
        for (int j = 0; j < i; j++) { // fixed loop condition: j < i
            if (arr[j] > arr[j + 1]) {
                alreadySorted = false;
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        if (alreadySorted) break;
    }
    return arr;
}
`;
export const mergeSortCPP = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

void merge(vector<int>& arr, int low, int mid, int high) {
    vector<int> temp;
    int left = low, right = mid + 1;

    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push_back(arr[left++]);
        } else {
            temp.push_back(arr[right++]);
        }
    }

    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= high) temp.push_back(arr[right++]);

    for (int i = low; i <= high; i++) {
        arr[i] = temp[i - low];  // Offset fix
    }
}

void mergeSortRecursion(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int mid = (low + high) / 2;
    mergeSortRecursion(arr, low, mid);
    mergeSortRecursion(arr, mid + 1, high);
    merge(arr, low, mid, high);
}

string mergeSort(vector<int> arr) {
    mergeSortRecursion(arr, 0, arr.size() - 1);

    string result = "";
    for (int i = 0; i < arr.size(); i++) {
        result += to_string(arr[i]);
        if (i != arr.size() - 1) result += ", ";
    }
    return result;
}
`;
export const quickSortCPP = `
#include <iostream>
#include <vector>
#include <string>
using namespace std;

void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[low];
    int i = low, j = high;

    while (i < j) {
        while (i <= high && arr[i] <= pivot) i++;
        while (j >= low && arr[j] > pivot) j--;
        if (i < j) swap(arr[i], arr[j]);
    }

    swap(arr[low], arr[j]);
    return j;
}

void quickSortRecursion(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pIndex = partition(arr, low, high);
        quickSortRecursion(arr, low, pIndex - 1);
        quickSortRecursion(arr, pIndex + 1, high);
    }
}

string quickSort(vector<int> arr) {
    quickSortRecursion(arr, 0, arr.size() - 1);

    string result = "";
    for (int i = 0; i < arr.size(); i++) {
        result += to_string(arr[i]);
        if (i != arr.size() - 1) result += ", ";
    }
    return result;
}
`;
