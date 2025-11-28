import { textToArray } from "@/lib/helperFunctions";

//sorting data
export const SortingData = async () => import("./functions/sorting");
import * as SortingText from "./functions/sorting"

//recursion data
export const RecursionData = async () => import("./functions/recursion");
import * as RecursionText from "./functions/recursion";

//arrays data
export const ArraysData = async ()=>import ("./functions/arrays");
import * as ArraysText from "./functions/arrays"

//math data
export const MathData = async () => import("./functions/math");
import * as MathText from "./functions/math";

//hash data
export const HashData = async ()=> import ("./functions/hash");
import * as HashText from "./functions/hash"

//string data
export const StringData = async ()=> import ("./functions/string");
import * as StringText from "./functions/string"

//binarySearch data
export const BinarySearchData = async ()=> import ("./functions/binarySearch");
import * as BinarySearchText from "./functions/binarySearch"
//dp data
export const DPData = async ()=>import ("./functions/dynamic_programming");
import * as DPText from "./functions/dynamic_programming"

//_____________________________________________________________________________________//

export const categoryFromProblemDetails = [
  "All",
  "Array",
  "Math",
  "Hash",
  "Recursion",
  "Sorting",
  "String",
  "Binary_Search",
  "Dynamic Programming",
];
type ProblemSolutinFunction<TArgs extends [], TReturn> = (
  ...args: TArgs
) => TReturn;
export interface problemDetailsType<
  TArgs extends any[] = any[],
  TReturn = any
> {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "All" | "Array" | "Math" | "Hash" | "Recursion" | "Sorting" | "String" | "Binary_Search" | "Dynamic Programming";
  functions: ProblemSolutinFunction<TArgs, TReturn>;
  type: "return" | "void";
  sourceCode: {
    cpp: string;
    js: string;
  };
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  links?: string;
  tags: (
    | "math"
    | "number"
    | "string"
    | "array"
    | "recursion"
    | "hash-table"
    | "sorting"
    | "stack"
    | "queue"
    | "binary-search"
    | "dynamic-programming"
  )[];
  // testCode?: {};
  inputs: {
    type: "text" | "number";
    label: string;
    name: string;
    placeholder?: string;
    value?: [];
  }[];
  select?: {
    label: string;
    options: {
      key: string | number;
      value: string;
      name: string;
    }[];
  };
}
const problemDetails: problemDetailsType[] = [
  {
    id: 1,
    title: "Reverse an array using two pointer approach",
    difficulty: "Easy",
    category: "Array",
    functions: async (arr: string) =>
      (await RecursionData()).ReverseArray(textToArray(arr, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: RecursionText.ReverseArrayCPP,
      js: (await RecursionData()).ReverseArray.toString(),
    },
    description:
      "Reverses the given array using two pointer approach by swapping from both ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter an array:",
        name: "reverseArray",
        placeholder: "Enter comma-separated",
      },
    ],
  },
  {
    id: 2,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    functions: async (array: string, target: number) =>
      (await ArraysData()).findTwoNumIndex(textToArray(array, "number") as number[], target),
    type: "return",
    sourceCode: {
      cpp: ArraysText.findTwoNumIndexCPP,
      js: (await ArraysData()).findTwoNumIndex.toString(),
    },
    description:
      "Finds indices of the two numbers that add up to the target value.",
    timeComplexity: "O(n)",
    tags: ["array", "hash-table"],
    spaceComplexity: "O(n)",
    inputs: [
      {
        type: "text",
        label: "Array(comma-separated):",
        name: "number",
        placeholder: "Enter comma-separated",
      },
      {
        type: "number",
        label: "Target:",
        name: "target",
        placeholder: "enter target",
      },
    ],
  },
  {
    id: 3,
    title: "Return Unique",
    difficulty: "Easy",
    category: "Array",
    functions: async (array: string) =>
      (await ArraysData()).findUniqueNum(textToArray(array, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.findUniqueNumCPP,
      js: (await ArraysData()).findUniqueNum.toString(),
    },
    description:
      "Finds the unique number in an array where every other element appears twice.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "hash-table"],
    inputs: [
      {
        type: "text",
        label: "Enter numbers(comma-separated):",
        name: "number",
        placeholder: "Enter comma-separated",
      },
    ],
  },
  {
    id: 4,
    title: "Print nums using recurrsion",
    difficulty: "Easy",
    category: "Recursion",
    functions: async (i: number, n: number) => (await RecursionData()).printNnums(i, n),
    type: "void",
    sourceCode: {
      cpp: RecursionText.printNnumsCPP,
      js: (await RecursionData()).printNnums.toString(),
    },
    description: "Prints numbers from i to n using recursion.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["number", "recursion"],
    inputs: [
      // {
      //   type: "number",
      //   label: "Num-I:",
      //   name: "numI",
      //   placeholder: "enter a number",
      // },
      // {
      //   type: "number",
      //   label: "Num-N:",
      //   name: "numN",
      //   placeholder: "enter a number",
      // },
    ],
  },
  {
    id: 5,
    title: "Get factors of a number",
    difficulty: "Easy",
    category: "Math",
    functions: async (n: number) => (await MathData()).findNumDivisors(n),
    type: "return",
    sourceCode: {
      cpp: MathText.findNumDivisorsCPP,
      js: (await MathData()).findNumDivisors.toString(),
    },
    description: "Returns all the factors of a number.",
    timeComplexity: "O(sqrt(n))",
    spaceComplexity: "O(1)",
    tags: ["math"],
    inputs: [
      {
        type: "number",
        label: "Number:",
        name: "FND_NUM",
        placeholder: "enter a number",
      },
    ],
  },
  {
    id: 6,
    title: "Check Prime Number",
    difficulty: "Easy",
    category: "Math",
    functions: async (n: number) => (await MathData()).findPrimeNum(n),
    type: "return",
    sourceCode: {
      cpp: MathText.findPrimeNumCPP,
      js: (await MathData()).findPrimeNum.toString(),
    },
    description: "Checks whether a given number is prime.",
    timeComplexity: "O(sqrt(n))",
    spaceComplexity: "O(1)",
    tags: ["number", "math"],
    inputs: [
      {
        type: "number",
        label: "Number:",
        name: "prime",
        placeholder: "enter a number",
      },
    ],
  },
  {
    id: 7,
    title: "Get Fibonacci series",
    difficulty: "Easy",
    category: "Math",
    functions: async (n: number) => (await MathData()).fibonacciSeries(n),
    type: "return",
    sourceCode: {
      cpp: MathText.fibonacciSeriesCPP,
      js: (await MathData()).fibonacciSeries.toString(),
    },
    description: "Generates the Fibonacci sequence up to the nth number.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["math", "number"],
    inputs: [
      {
        type: "number",
        label: "Number:",
        name: "number",
        placeholder: "enter a number",
      },
    ],
  },
  {
    id: 8,
    title: "Check if a string is Palindrome",
    difficulty: "Medium",
    category: "Math",
    functions: async (text: string) => (await MathData()).isPalindrome(text),
    type: "return",
    sourceCode: {
      cpp: MathText.isPalindromeCPP,
      js: (await MathData()).isPalindrome.toString(),
    },
    description:
      "Checks if the given string reads the same forwards and backwards.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["math", "string"],
    inputs: [
      {
        type: "text",
        label: "Text:",
        name: "Text",
        placeholder: "enter a text...",
      },
    ],
  },
  {
    id: 9,
    title: "Check the occurance of character in a string",
    difficulty: "Medium",
    category: "Hash",
    functions: async (text: string, char: string) => (await HashData()).checkCharacter(text, char),
    type: "return",
    sourceCode: {
      cpp: HashText.checkCharacterCPP,
      js: (await HashData()).checkCharacter.toString(),
    },
    description: "Returns the number of time the character occurs in a given string.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "hash-table"],
    inputs: [
      {
        type: "text",
        label: "Enter text:",
        name: "charCheckText",
        placeholder: "enter a text...",
      },
      {
        type: "text",
        label: "Enter a character:",
        name: "charCheckQuery",
        placeholder: "enter a query...",
      },
    ],
  },
  {
    id: 10,
    title: "Sorting array using selection-sort",
    difficulty: "Easy",
    category: "Sorting",
    functions: async (text: string) =>
      (await SortingData()).SelectionSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: SortingText.selectionSortCPP,
      js: (await SortingData()).SelectionSort.toString(),
    },
    description: "Sorts an array using the selection sort algorithm.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    tags: ["array", "sorting"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "selectSortArray",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 11,
    title: "Sorting array using bubble-sort",
    difficulty: "Easy",
    category: "Sorting",
    functions: async (text: string) =>
      (await SortingData()).bubbleSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: SortingText.bubbleSortCPP,
      js: (await SortingData()).bubbleSort.toString(),
    },
    description: "Sorts an array using the bubble sort algorithm.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    tags: ["array", "sorting"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "selectSortArray",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 12,
    title: "Sorting array using insertion-sort",
    difficulty: "Easy",
    category: "Sorting",
    functions: async (text: string) =>
      (await SortingData()).insertionSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: SortingText.insertionSortCPP,
      js: (await SortingData()).insertionSort.toString(),
    },
    description: "Sorts an array using the insertion sort algorithm.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    tags: ["array", "sorting"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "selectSortArray",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 13,
    title: "Sorting array using merge-sort",
    difficulty: "Medium",
    category: "Sorting",
    functions: async (text: string) =>
      (await SortingData()).mergeSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: SortingText.mergeSortCPP,
      js: (await SortingData()).mergeSort.toString(),
    },
    description:
      "Sorts an array using the merge sort algorithm (divide and conquer).",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    tags: ["array", "sorting"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "selectSortArray",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 14,
    title: "Removing K element",
    difficulty: "Easy",
    category: "Array",
    functions: async (text: string, number: number) =>
    (await ArraysData()).removeKElement(textToArray(text, "number") as number[], number),
    type: "return",
    sourceCode: {
      cpp: ArraysText.removeKElementCPP,
      js: (await ArraysData()).removeKElement.toString(),
    },
    description: "Alters/replaces all occurrences of a given number k with other non-k elements in the array and returns the length of the new array starting from 0.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "removeElementArray",
        placeholder: "enter a array (comma-separated)...",
      },
      {
        type: "number",
        label: "Enter Number:",
        name: "removeElementVal",
        placeholder: "Enter k number....",
      },
    ],
  },
  {
    id: 15,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "Array",
    functions: async (text: string) =>
      (await ArraysData()).getLongestCommonPrefix(textToArray(text, "string") as string[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.getLongestCommonPrefixCPP,
      js: (await ArraysData()).getLongestCommonPrefix.toString(),
    },
    description:
      "Finds the longest common prefix among all strings in the array.",
    timeComplexity: "O(n * m)",
    spaceComplexity: "O(1)",
    tags: ["string"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "getLongestCommonPrefix",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 16,
    title: "Sorting array using quick-sort",
    difficulty: "Easy",
    category: "Array",
    functions: async (text: string) =>
      (await SortingData()).quickSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: SortingText.quickSortCPP,
      js: (await SortingData()).quickSort.toString(),
    },
    description:
      "Sorts an array using the quick sort algorithm (divide and conquer).",
    timeComplexity: "O(n log n) on average, O(n^2) worst case",
    spaceComplexity: "O(log n)",
    tags: ["array", "sorting"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "quickSort",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 17,
    title: "Find the missing number in array 1 to N",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string, n: number) =>
      (await ArraysData()).findMissingNumInArr1toN(textToArray(nums, "number") as number[], n),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).findMissingNumInArr1toN.toString(),
    },
    description:
      "finds a missing number in an array from 1 to n. Brute, better and optimal approches.",
    timeComplexity: "O(n) on optimal, O(2n) on average, O(n^2) worst case",
    spaceComplexity:
      "O() or O(1) on optimal, O(n) on average, O(1) on worst-case",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "findMissingNums",
        placeholder: "enter a array (comma-separated)...",
      },
      {
        type: "number",
        label: "Enter number:",
        name: "findMissingNumsN",
        placeholder: "number",
      },
    ],
  },
  {
    id: 18,
    title: "Maximum consecutive 1 in an array",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).maxConsecutive1(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).maxConsecutive1.toString(),
    },
    description:
      "finds max number of times one appears in an array. returns 0 if there is no 1 in the array.",
    timeComplexity: "O(n) on optimal",
    spaceComplexity: "O(2) on optimal",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "findMaxConsecutive",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 19,
    title: "Number appeared once in an array of twice",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).NumAppearsOnce(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).NumAppearsOnce.toString(),
    },
    description:
      "returns which number has appeared once in an array where all the numbers appears twice",
    timeComplexity: "O(n) on optimal",
    spaceComplexity: "O() on optimal",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "numAppearanceOnce",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 20,
    title: "Plus One",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).PlusOne(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).PlusOne.toString(),
    },
    description: "increments the array of digits by one and returns the array",
    timeComplexity: "O(n) on optimal",
    spaceComplexity: "O(n) on worst-case",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "plus-one",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 21,
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).MajorityElement(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.MajorityElementCpp,
      js: (await ArraysData()).MajorityElement.toString(),
    },
    description: "finds the major (most appeared) number in the array",
    timeComplexity: "O(n) or O(2n) on optimal",
    spaceComplexity: "O(n) on better",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "major-el",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 22,
    title: "Check if sorted",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).checkIfSorted(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).checkIfSorted.toString(),
    },
    description:
      "checks if array is sorted in ascending order and returns false if not.",
    timeComplexity: "O(n)",
    spaceComplexity: "negative",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "check-asc-sort",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 23,
    title: "Second Largest",
    difficulty: "Easy",
    category: "Array",
    functions: async (nums: string) =>
      (await ArraysData()).theSecondLargest(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).theSecondLargest.toString(),
    },
    description:
      "Returns the second-largest number in the array. Returns -1 if there is no second-largest.",
    timeComplexity: "O(n)",
    spaceComplexity: "negative",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array(comma-separated):",
        name: "secondL",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 24,
    title: "Merge 2 sorted-array",
    difficulty: "Medium",
    category: "Array",
    functions: async (arr1: string, arr2: string, n: number, m: number) =>
      (await ArraysData()).mergeTwoSortedArray(
        textToArray(arr1, "number") as number[],
        textToArray(arr2, "number") as number[],
        Number(n),
        Number(m)
      ),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).mergeTwoSortedArray.toString(),
    },
    description: "Merges two sorted arrays without using a third array",
    timeComplexity: "O(min(n, m)) + O(nLogn) + O(mlogm)",
    spaceComplexity: "negative",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter arr1:",
        name: "MSArr1",
        placeholder: "Enter the first-array(comma-separated)",
      },
      {
        type: "text",
        label: "Enter arr2:",
        name: "MSArr2",
        placeholder: "Enter the second-array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter n:",
        name: "MSN",
        placeholder: "Length of first array",
      },
      {
        type: "number",
        label: "Enter m:",
        name: "MSM",
        placeholder: "Length of second array",
      },
    ],
  },
  {
    id: 25,
    title: "Left-rotate an Array",
    difficulty: "Easy",
    category: "Array",
    functions: async (arr1: string, d: number) =>
      (await ArraysData()).leftRotate(textToArray(arr1, "number") as number[], d),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).leftRotate.toString(),
    },
    description: "Rotates an array by d places",
    timeComplexity: "O(d) + O(n-d) + O(d) = O(n+d)",
    spaceComplexity: "O(d)",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter arr1:",
        name: "LRA",
        placeholder: "Enter the first-array(comma-separated)",
      },
      {
        type: "number",
        label: "d",
        name: "LRA_D",
        placeholder: "Enter d",
      },
    ],
  },
  {
    id: 26,
    title: "Longest consecutive sequence in a array ",
    difficulty: "Medium",
    category: "Array",
    functions: async (arr1: string) =>
      (await ArraysData()).longestConsecutiveSequence(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).longestConsecutiveSequence.toString(),
    },
    description: "Rotates an array by d places",
    timeComplexity: "O(3n)",
    spaceComplexity: "O(n)",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "LCSA",
        placeholder: "Enter the array(comma-separated)",
      },
    ],
  },
  {
    id: 27,
    title: "Next Permutation",
    difficulty: "Medium",
    category: "Array",
    functions: async (arr1: string) =>
      (await ArraysData()).NextPermutation(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.NextPermutationCpp,
      js: (await ArraysData()).NextPermutation.toString(),
    },
    description:
      "Returns the next greatest permutation of the given array or returns the lowest.",
    timeComplexity: "O(3n)",
    spaceComplexity: "O(n) or O(1)",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "NPA",
        placeholder: "Enter the array(comma-separated)",
      },
    ],
  },
  {
    id: 28,
    title: "Majority element N/3 times",
    difficulty: "Medium",
    category: "Array",
    functions: async (arr1: string) =>
      (await ArraysData()).MajorityElementNbyThreetimes(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.MajorityElementN3timesCpp,
      js: (await ArraysData()).MajorityElementNbyThreetimes.toString(),
    },
    description:
      "Returns the numbers which appears more than one-third time in the array",
    timeComplexity: "O(2n)",
    spaceComplexity: "O(1)",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "MENT",
        placeholder: "Enter the array(comma-separated)",
      },
    ],
  },
  {
    id: 29,
    title: "Balanced Parentheses",
    difficulty: "Easy",
    category: "String",
    functions: async (string: string) => (await StringData()).balancedParanthesis(string),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await StringData()).balancedParanthesis.toString(),
    },
    description: "Returns boolean if a string contains balanced parentheses",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["string", "stack"],
    inputs: [
      {
        type: "text",
        label: "Enter string:",
        name: "BP",
        placeholder: "Enter string containg only brackets",
      },
    ],
  },
  {
    id: 30,
    title: "Longest non-repeating sub-string",
    difficulty: "Easy",
    category: "String",
    functions: async (string: string) => (await StringData()).longestSubstringWithoutRepeatingChar(string),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await StringData()).longestSubstringWithoutRepeatingChar.toString(),
    },
    description: "Returns boolean if a string contains balanced parentheses",
    timeComplexity: "O(n)",
    spaceComplexity: "O(256)",
    tags: ["string", "hash-table"],
    inputs: [
      {
        type: "text",
        label: "Enter string:",
        name: "LNCSS",
        placeholder: "Enter string....",
      },
    ],
  },
  {
    id: 31,
    title: "IndexOf the First Occurrence in a String",
    difficulty: "Easy",
    category: "String",
    functions: async (needle: string, haystack: string) =>
      (await StringData()).FirstOccurrenceString(needle, haystack),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await StringData()).FirstOccurrenceString.toString(),
    },
    description: "Returns the indexOf the first occurrence in a String",
    timeComplexity: "O(n*m)",
    spaceComplexity: "O(1)",
    tags: ["string"],
    inputs: [
      {
        type: "text",
        label: "Enter needle:",
        name: "FOS_N",
        placeholder: "Enter word to search....",
      },
      {
        type: "text",
        label: "Enter haystack:",
        name: "FOS_H",
        placeholder: "Enter text....",
      },
    ],
  },
  {
    id: 32,
    title: "Prefix / Infix / Postfix",
    difficulty: "Easy",
    category: "String",
    functions: async (string: string, option: string) =>
      (await StringData()).PrefixInfixPostfix(string, option),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await StringData()).PrefixInfixPostfix.toString(),
    },
    description: "Returns the converted value using stack and queue",
    timeComplexity: "O()",
    spaceComplexity: "O()",
    tags: ["string"],
    inputs: [
      {
        type: "text",
        label: "Enter string:",
        name: "PIP_S",
        placeholder: "Enter string....",
      },
    ],
    select: {
      label: "Conversion type",
      options: [
        {
          name: "Infix to Postfix",
          key: "InTOPf",
          value: "InfixToPostfix",
        },
      ],
    },
  },
  {
    id: 33,
    title: "MaxSubArrSum",
    difficulty: "Hard",
    category: "Array",
    functions: async (arr: string) =>
      (await ArraysData()).MaxSubArrSum(textToArray(arr, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).MaxSubArrSum.toString(),
    },
    description:
      "Returns the max value that can be obtained through a sub-string in the given array using Kadan's Algorithm.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "MSAS",
        placeholder: "Enter the array(comma-separated)..",
      },
    ],
  },
  {
    id: 34,
    title: "Search Insert Position",
    difficulty: "Easy",
    category: "Array",
    functions: async (arr: string, target: number) =>
      (await ArraysData()).SearchInsertPosition(textToArray(arr, "number") as number[], target),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).SearchInsertPosition.toString(),
    },
    description:
      "Returns the location of the target where it is stored or where it can be stored",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "SIP_A",
        placeholder: "Enter the array(comma-separated)..",
      },
      {
        type: "number",
        label: "Enter target:",
        name: "SIP_T",
        placeholder: "Enter the target",
      },
    ],
  },
  {
    id: 35,
    title: "First Bad Version",
    difficulty: "Easy",
    category: "Binary_Search",
    functions: async (n: number, badVersion: number) =>
      (await BinarySearchData()).FirstBadVersion(n, badVersion),
    type: "return",
    sourceCode: {
      cpp: BinarySearchText.FirstBadVersionCpp,
      js: (await BinarySearchData()).FirstBadVersion.toString(),
    },
    description: "Returns the left most bad version found using binary search",
    timeComplexity: "O(n/2)",
    spaceComplexity: "O(1)",
    tags: ["binary-search"],
    inputs: [
      {
        type: "number",
        label: "Enter number of versions:",
        name: "FBV-VN",
        placeholder: "Enter version......",
      },
      {
        type: "number",
        label: "Enter estimated bad-version:",
        name: "FBV-VB",
        placeholder: "Enter the target bad-version.....",
      },
    ],
  },
  {
    id: 36,
    title: "Square root using binary search",
    difficulty: "Easy",
    category: "Binary_Search",
    functions: async (n: number) => (await MathData()).Sqrtx(n),
    type: "return",
    sourceCode: {
      cpp: MathText.sqrtxCPP,
      js: (await MathData()).Sqrtx.toString(),
    },
    description: "Returns the square exact or nearest root of the given number.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    tags: ["binary-search", "math"],
    inputs: [
      {
        type: "number",
        label: "Enter number:",
        name: "SQR_X",
        placeholder: "Enter number after 1......",
      },
    ],
  },
  {
    id: 37,
    title: "Summary Ranges",
    difficulty: "Easy",
    category: "Array",
    functions: async (n: number[]) =>
      (await ArraysData()).SummaryRanges(n),
    type: "return",
    sourceCode: {
      cpp: ArraysText.SummaryRangesCpp,
      js: (await ArraysData()).SummaryRanges.toString(),
    },
    description: "Returns the consecutive sequences into ranges.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array"],
    inputs: [
      {
        type: "number",
        label: "Enter array of number:",
        name: "SR_Nums",
        placeholder: "Enter the array(comma-separated)",
      },
    ],
  },
  {
    id: 38,
    title: "Word Break",
    difficulty: "Medium",
    links: "https://leetcode.com/problems/word-break/?envType=problem-list-v2&envld=array",
    category: "Dynamic Programming",
    functions: async (s: string, wordDict: string) =>
      (await DPData()).wordBreak(s, textToArray(wordDict, "string") as string[]),
    type: "return",
    sourceCode: {
      cpp: DPText.wordBreakCPP,
      js: (await DPData()).wordBreak.toString(),
    },
    description: "Returns boolean if a string contains the given words in the dictonary can be cut as a substring or not",
    timeComplexity: "O(n*n)",
    spaceComplexity: "O(n)",
    tags: ["array", "dynamic-programming"],
    inputs: [
      {
        type: "text",
        label: "Enter string:",
        name: "WB_STR",
        placeholder: "Enter string",
      },
      {
        type: "text",
        label: "Enter array of string:",
        name: "WB_DICT",
        placeholder: "Enter the array(comma-separated)",
      },
    ],
  },
  {
    id: 39,
    title: "Dynamic Programming - Fibonnaci numbers",
    difficulty: "Easy",
    category: "Dynamic Programming",
    functions: async (s: number) =>
      (await DPData()).DPFibonacci(s),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await DPData()).DPFibonacci.toString(),
    },
    description: "Returns the nth fibonacci number ",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["recursion", "dynamic-programming"],
    inputs: [
      {
        type: "number",
        label: "Enter n:",
        name: "DP_Fibonacci_n",
        placeholder: "Enter from 1 to 1 000 000",
      },
    ],
  },
  {
    id: 40,
    title: "Best Time to Buy and Sell stocks",
    difficulty: "Medium",
    category: "Dynamic Programming",
    links: "https://takeuforward.org/data-structure/stock-buy-and-sell/",
    functions: async (n: string) =>
      (await DPData()).DPStockBuy(textToArray(n, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await DPData()).DPStockBuy.toString(),
    },
    description: "Returns the max-profit we will get from the given prices",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "dynamic-programming"],
    inputs: [
      {
        type: "text",
        label: "Enter n:",
        name: "DP_Stock_Price",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 41,
    title: "How many times an array is rotated.",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (n: string) =>
      (await BinarySearchData()).TimesArrayRotated(textToArray(n, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).TimesArrayRotated.toString(),
    },
    description: "Returns how many times the array is rotated",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter n:",
        name: "TAR_N",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 42,
    title: "Leaders in an array.",
    difficulty: "Medium",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await ArraysData()).ArrayLeaders(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).ArrayLeaders.toString(),
    },
    description: "Returns an array of leaders in an array(numbers whose right are always than the number in the array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) _ worst-case",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "AL_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 43,
    title: "Three sum",
    difficulty: "Hard",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await ArraysData()).ThreeSum(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ArraysText.ThreeSumCPP,
      js: (await ArraysData()).ThreeSum.toString(),
    },
    description: "Returns an array of all the unique triplets that on additon returns 0.",
    timeComplexity: "O(n log n) + O(n + n)",
    spaceComplexity: "O(number of triplets)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "TS_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 44,
    title: "Four sum",
    difficulty: "Hard",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string, target: number) =>
      (await ArraysData()).FourSum(textToArray(nums, "number") as number[], target),
    type: "return",
    sourceCode: {
      cpp: ArraysText.FourSumCpp,
      js: (await ArraysData()).FourSum.toString(),
    },
    description: "Returns an array of all the unique Quads that on additon returns target.",
    timeComplexity: "O(n * n * n)",
    spaceComplexity: "O(number of quads)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "FS_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter target:",
        name: "FS_TARGET",
        placeholder: "target",
      },
  ]
  },
  {
    id: 45,
    title: "Count Inversions",
    difficulty: "Hard",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await ArraysData()).CountInversionArr(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).CountInversionArr.toString(),
    },
    description: "Returns the number of pairs the array of number can form where the left number is greater than the right",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "CI_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 46,
    title: "Reverse Pairs",
    difficulty: "Hard",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await ArraysData()).ReversePairs(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).ReversePairs.toString(),
    },
    description: "Returns the number of pairs the array of number can form where the left number is greater than the twice of right",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "RP_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 47,
    title: "Sort an array of 0s, 1s and 2s",
    difficulty: "Medium",
    category: "Array",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await ArraysData()).SortArray012(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await ArraysData()).SortArray012.toString(),
    },
    description: "Returns the sorted array using 'Dutch National Flag' algorithim",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "SZOT_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 48,
    title: "Lower_Upper Bound",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (nums: string, k: number) =>
      (await BinarySearchData()).Lower_Upperbound(textToArray(nums, "number") as number[], k),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).Lower_Upperbound.toString(),
    },
    description: "Returns lowerbound ans",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "LUB_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter k:",
        name: "LUB_K",
        placeholder: "Enter the number",
      },
  ]
  },
  {
    id: 49,
    title: "Floor and Ceil",
    difficulty: "Medium",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (type: string, nums: string, k: number) =>
      (await BinarySearchData()).floorCeil(type, textToArray(nums, "number") as number[], k),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).floorCeil.toString(),
    },
    description: "Returns the floor and ceil in an array of number for a given target",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter type:",
        name: "FLOORCEIL_TYPE",
        placeholder: "Enter the type floor or ceil. Default is ceil",
      },
      {
        type: "text",
        label: "Enter nums:",
        name: "FLOORCEIL_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter k:",
        name: "FLOORCEIL_K",
        placeholder: "Enter the number",
      },
  ]
  },
  {
    id: 50,
    title: "Occurance first, last and count",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (nums: string, k: number) =>
      (await BinarySearchData()).occuranceFirstLastCount(textToArray(nums, "number") as number[], k),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).occuranceFirstLastCount.toString(),
    },
    description: "Returns an array of first occurance index, last occurance index and total number of count",
    timeComplexity: "O(2 * log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "OFLC_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter k:",
        name: "OFLC_K",
        placeholder: "Enter the number",
      },
  ]
  },
  {
    id: 51,
    title: "Search Element in rotated sorted array",
    difficulty: "Medium",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (nums: string, k: number) =>
      (await BinarySearchData()).searchElementInRoatedSortedArr(textToArray(nums, "number") as number[], k),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).searchElementInRoatedSortedArr.toString(),
    },
    description: "Returns an the index where the target is found else returns -1",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "STRSA_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter k:",
        name: "STRSA_K",
        placeholder: "Enter the number",
      },
  ]
  },
  {
    id: 52,
    title: "Minimum in rotated sorted array",
    difficulty: "Medium",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await BinarySearchData()).minRotaSortArr(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).minRotaSortArr.toString(),
    },
    description: "Returns the minimum in rotated sorted array.",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "MRSA_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 53,
    title: "Single element in sorted array of doubles",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "takeyouforward",
    functions: async (nums: string) =>
      (await BinarySearchData()).singleElement(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).singleElement.toString(),
    },
    description: "Returns the single element in an sorted where every other element appears twice.",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "SESA_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 54,
    title: "Peak Element",
    difficulty: "Hard",
    category: "Binary_Search",
    links: "https://takeuforward.org/data-structure/peak-element-in-array/",
    functions: async (nums: string) =>
      (await BinarySearchData()).PeakElement(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).PeakElement.toString(),
    },
    description: "Returns any peak element (a[mid-1] < a[mid] > a[mid+1]) found in the array.",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter nums:",
        name: "PE_NUMS",
        placeholder: "Enter the array(comma-separated)",
      },
  ]
  },
  {
    id: 55,
    title: "Peak Element",
    difficulty: "Hard",
    category: "Binary_Search",
    links: "https://takeuforward.org/data-structure/peak-element-in-array/",
    functions: async (n: number) =>
      (await BinarySearchData()).floorSqrtBS(n),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).floorSqrtBS.toString(),
    },
    description: "Returns ????????????????????????",
    timeComplexity: "O(log base 2 n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "number",
        label: "Enter n:",
        name: "FSBS_N",
        placeholder: "Enter n;",
      },
  ]
  },
  {
    id: 56,
    title: "Capacity to Ship Packages within D days.",
    difficulty: "Hard",
    category: "Binary_Search",
    links: "https://takeuforward.org/arrays/capacity-to-ship-packages-within-d-days/",
    functions: async (wt: string, days: number) =>
      (await BinarySearchData()).minShipPackage(textToArray(wt, "number") as number[], days),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).minShipPackage.toString(),
    },
    description: "Returns min number of weight required to ship the package in the required days.",
    timeComplexity: "O(log (sum + max + 1) * n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter weights:",
        name: "MSPW_WT",
        placeholder: "Enter weights in sorted order......",
      },
      {
        type: "number",
        label: "Enter Days:",
        name: "MSPW_D",
        placeholder: "Enter days;",
      },
  ]
  },
  {
    id: 57,
    title: "Find the Smallest Divisor Given a Threshold",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "https://takeuforward.org/arrays/find-the-smallest-divisor-given-a-threshold/",
    functions: async (a: string, threshold: number) =>
      (await BinarySearchData()).SmallestDivisorThresold(textToArray(a, "number") as number[], threshold),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).SmallestDivisorThresold.toString(),
    },
    description: "Returns min number in the array that can divide the entire array and return the ciel value lesser than equal to the threshold",
    timeComplexity: "O((log base 2 m*m) * n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "text",
        label: "Enter array:",
        name: "SDT_A",
        placeholder: "Enter the array(comma-separated)",
      },
      {
        type: "number",
        label: "Enter Threshold:",
        name: "SDT_THREAHOLD",
        placeholder: "Enter Threshold;",
      },
  ]
  },
  {
    id: 58,
    title: "Find the Nth Root of an Integer",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
    functions: async (int: number, root: number) =>
      (await BinarySearchData()).NRootInteger(int, root),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).NRootInteger.toString(),
    },
    description: "Returns the nth root of an integer and if not found returns -1",
    timeComplexity: "O((log base 2 m*m) * n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "number",
        label: "Enter Integer:",
        name: "NRI_INT",
        placeholder: "_________________",
      },
      {
        type: "number",
        label: "Enter Root:",
        name: "NRI_ROOT",
        placeholder: "_________________",
      },
  ]
  },
  {
    id: 59,
    title: "Banana per Hour",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
    functions: async (a: number[], limit: number) =>
      (await BinarySearchData()).BananaPerHour(a, limit),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).BananaPerHour.toString(),
    },
    description: "Given an array of number that represents piles of stock that is to be completed within the limited hour. Calculates the minimum number of banana can be eaten per hour such that all the banana can be finished within the limited hour. ",
    timeComplexity: "O((log base 2 max of array) * n)",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "number",
        label: "Enter Array:",
        name: "BPH_ARR",
        placeholder: "_________________",
      },
      {
        type: "number",
        label: "Enter Limit-Hour:",
        name: "BPH_LH",
        placeholder: "_________________",
      },
  ]
  },
  {
    id: 60,
    title: "M Bouque with k flowers",
    difficulty: "Easy",
    category: "Binary_Search",
    links: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
    functions: async (a: number[], m: number, k: number) =>
      (await BinarySearchData()).MBouque(a, m, k),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: (await BinarySearchData()).MBouque.toString(),
    },
    description: "Given an array of flowers growing time, number of bouques needed and number of flowers per bouque it returns the minimum number it takes to make a bouque of flowers with given flowers per bouque.",
    timeComplexity: "",
    spaceComplexity: "O(1)",
    tags: ["array", "binary-search"],
    inputs: [
      {
        type: "number",
        label: "Enter Array:",
        name: "MBK_A",
        placeholder: "_________________",
      },
      {
        type: "number",
        label: "Enter No bouques:",
        name: "MBK_MID",
        placeholder: "_________________",
      },
      {
        type: "number",
        label: "Enter flowers per bouque:",
        name: "MBK_K",
        placeholder: "_________________",
      },
  ]
  },
];                                  
export default problemDetails;
// not-yet-parsed
// Enter the array(comma-separated)
//https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2