import { textToArray } from "@/lib/helperFunctions";
import {
  bubbleSort,
  bubbleSortCPP,
  insertionSort,
  insertionSortCPP,
  mergeSort,
  mergeSortCPP,
  quickSort,
  quickSortCPP,
  SelectionSort,
  selectionSortCPP,
} from "./functions/sorting";
import {
  printNnums,
  printNnumsCPP,
  ReverseArray,
  ReverseArrayCPP,
} from "./functions/recursion";
import {
  checkIfSorted,
  findMissingNumInArr1toN,
  findTwoNumIndex,
  findTwoNumIndexCPP,
  findUniqueNum,
  findUniqueNumCPP,
  getLongestCommonPrefix,
  getLongestCommonPrefixCPP,
  leftRotate,
  longestConsecutiveSequence,
  MajorityElement,
  MajorityElementCpp,
  MajorityElementN3timesCpp,
  MajorityElementNbyThreetimes,
  maxConsecutive1,
  MaxSubArrSum,
  mergeTwoSortedArray,
  NextPermutation,
  NextPermutationCpp,
  NumAppearsOnce,
  PlusOne,
  removeKElement,
  removeKElementCPP,
  SearchInsertPosition,
  theSecondLargest,
} from "./functions/arrays";
import {
  fibonacciSeries,
  fibonacciSeriesCPP,
  findNumDivisors,
  findNumDivisorsCPP,
  findPrimeNum,
  findPrimeNumCPP,
  isPalindrome,
  isPalindromeCPP,
} from "./functions/math";
import { checkCharacter, checkCharacterCPP } from "./functions/hash";
import {
  balancedParanthesis,
  FirstOccurrenceString,
  longestSubstringWithoutRepeatingChar,
  PrefixInfixPostfix,
} from "./functions/string";
import { FirstBadVersion, FirstBadVersionCpp } from "./functions/binarySearch";
export const categoryFromProblemDetails = [
  "All",
  "Array",
  "Math",
  "Hash",
  "Recursion",
  "Sorting",
  "String",
  "Binary Search",
  "",
];
type ProblemSolutinFunction<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn;
export interface problemDetailsType<
  TArgs extends any[] = any[],
  TReturn = any
> {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  functions: ProblemSolutinFunction<TArgs, TReturn>;
  type: "return" | "void";
  sourceCode: {
    cpp: string;
    js: string;
  };
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
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
  )[];
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
    title: "Reverse an array using Recursion",
    difficulty: "Medium",
    category: "Recursion",
    functions: (arr: string) =>
      ReverseArray(textToArray(arr, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: ReverseArrayCPP,
      js: ReverseArray.toString(),
    },
    description:
      "Reverses the given array using recursion by swapping from both ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n) (due to recursion stack)",
    tags: ["array", "recursion"],
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
    functions: (array: string, target: number) =>
      findTwoNumIndex(textToArray(array, "number") as number[], target),
    type: "return",
    sourceCode: {
      cpp: findTwoNumIndexCPP,
      js: findTwoNumIndex.toString(),
    },
    description:
      "Finds indices of the two numbers that add up to the target value.",
    timeComplexity: "O(n)",
    tags: ["array", "string"],
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
    functions: (array: string) =>
      findUniqueNum(textToArray(array, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: findUniqueNumCPP,
      js: findUniqueNum.toString(),
    },
    description:
      "Finds the unique number in an array where every other element appears twice.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["array", "number"],
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
    functions: (i: number, n: number) => printNnums(i, n),
    type: "void",
    sourceCode: {
      cpp: printNnumsCPP,
      js: printNnums.toString(),
    },
    description: "Prints numbers from i to n using recursion.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["number", "recursion"],
    inputs: [
      {
        type: "number",
        label: "Num-I:",
        name: "numI",
        placeholder: "enter a number",
      },
      {
        type: "number",
        label: "Num-N:",
        name: "numN",
        placeholder: "enter a number",
      },
    ],
  },
  {
    id: 5,
    title: "Get factors of a number",
    difficulty: "Easy",
    category: "Math",
    functions: (n: number) => findNumDivisors(n),
    type: "return",
    sourceCode: {
      cpp: findNumDivisorsCPP,
      js: findNumDivisors.toString(),
    },
    description: "Returns all the factors of a number.",
    timeComplexity: "O(sqrt(n))",
    spaceComplexity: "O(1)",
    tags: ["math"],
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
    id: 6,
    title: "Check Prime Number",
    difficulty: "Easy",
    category: "Math",
    functions: (n: number) => findPrimeNum(n),
    type: "return",
    sourceCode: {
      cpp: findPrimeNumCPP,
      js: findPrimeNum.toString(),
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
    functions: (n: number) => fibonacciSeries(n),
    type: "return",
    sourceCode: {
      cpp: fibonacciSeriesCPP,
      js: fibonacciSeries.toString(),
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
    functions: (text: string) => isPalindrome(text),
    type: "return",
    sourceCode: {
      cpp: isPalindromeCPP,
      js: isPalindrome.toString(),
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
    title: "Check if a character in a string",
    difficulty: "Medium",
    category: "Hash",
    functions: (text: string, char: string) => checkCharacter(text, char),
    type: "return",
    sourceCode: {
      cpp: checkCharacterCPP,
      js: checkCharacter.toString(),
    },
    description: "Checks if a given character is present in the string.",
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
    functions: (text: string) =>
      SelectionSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: selectionSortCPP,
      js: SelectionSort.toString(),
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
    functions: (text: string) =>
      bubbleSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: bubbleSortCPP,
      js: bubbleSort.toString(),
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
    functions: (text: string) =>
      insertionSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: insertionSortCPP,
      js: insertionSort.toString(),
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
    functions: (text: string) =>
      mergeSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: mergeSortCPP,
      js: mergeSort.toString(),
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
    functions: (text: string, number: number) =>
      removeKElement(textToArray(text, "number") as number[], number),
    type: "return",
    sourceCode: {
      cpp: removeKElementCPP,
      js: removeKElement.toString(),
    },
    description: "Removes all occurrences of a given number k from the array.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
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
    functions: (text: string) =>
      getLongestCommonPrefix(textToArray(text, "string") as string[]),
    type: "return",
    sourceCode: {
      cpp: getLongestCommonPrefixCPP,
      js: getLongestCommonPrefix.toString(),
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
    functions: (text: string) =>
      quickSort(textToArray(text, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: quickSortCPP,
      js: quickSort.toString(),
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
    functions: (nums: string, n: number) =>
      findMissingNumInArr1toN(textToArray(nums, "number") as number[], n),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: findMissingNumInArr1toN.toString(),
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
        label: "Enter array(comma-separated):",
        name: "findMissingNumsN",
        placeholder: "enter a array (comma-separated)...",
      },
    ],
  },
  {
    id: 18,
    title: "Maximum consecutive 1 in an array",
    difficulty: "Easy",
    category: "Array",
    functions: (nums: string) =>
      maxConsecutive1(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: maxConsecutive1.toString(),
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
    functions: (nums: string) =>
      NumAppearsOnce(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: NumAppearsOnce.toString(),
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
    functions: (nums: string) =>
      PlusOne(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: PlusOne.toString(),
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
    functions: (nums: string) =>
      MajorityElement(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: MajorityElementCpp,
      js: MajorityElement.toString(),
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
    functions: (nums: string) =>
      checkIfSorted(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: checkIfSorted.toString(),
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
    functions: (nums: string) =>
      theSecondLargest(textToArray(nums, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: theSecondLargest.toString(),
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
    functions: (arr1: string, arr2: string, n: number, m: number) =>
      mergeTwoSortedArray(
        textToArray(arr1, "number") as number[],
        textToArray(arr2, "number") as number[],
        Number(n),
        Number(m)
      ),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: mergeTwoSortedArray.toString(),
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
    functions: (arr1: string, d: number) =>
      leftRotate(textToArray(arr1, "number") as number[], d),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: leftRotate.toString(),
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
    title: "Left-rotate an Array",
    difficulty: "Easy",
    category: "Array",
    functions: (arr1: string, d: number) =>
      leftRotate(textToArray(arr1, "number") as number[], d),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: leftRotate.toString(),
    },
    description: "Rotates an array by d places",
    timeComplexity: "O(d) + O(n-d) + O(d) = O(n+d)",
    spaceComplexity: "O(d)",
    tags: ["array", "number"],
    inputs: [
      {
        type: "text",
        label: "Enter arr:",
        name: "LRA",
        placeholder: "Enter the array(comma-separated)",
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
    id: 27,
    title: "Longest consecutive sequence in a array ",
    difficulty: "Medium",
    category: "Array",
    functions: (arr1: string) =>
      longestConsecutiveSequence(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: longestConsecutiveSequence.toString(),
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
    id: 28,
    title: "Next Permutation",
    difficulty: "Medium",
    category: "Array",
    functions: (arr1: string) =>
      NextPermutation(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: NextPermutationCpp,
      js: NextPermutation.toString(),
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
    id: 29,
    title: "Majority element N/3 times",
    difficulty: "Medium",
    category: "Array",
    functions: (arr1: string) =>
      MajorityElementNbyThreetimes(textToArray(arr1, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: MajorityElementN3timesCpp,
      js: MajorityElementNbyThreetimes.toString(),
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
    id: 30,
    title: "Balanced Parentheses",
    difficulty: "Easy",
    category: "String",
    functions: (string: string) => balancedParanthesis(string),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: balancedParanthesis.toString(),
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
    id: 31,
    title: "Longest non-repeating sub-string",
    difficulty: "Easy",
    category: "String",
    functions: (string: string) => longestSubstringWithoutRepeatingChar(string),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: longestSubstringWithoutRepeatingChar.toString(),
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
    id: 32,
    title: "IndexOf the First Occurrence in a String",
    difficulty: "Easy",
    category: "String",
    functions: (needle: string, haystack: string) =>
      FirstOccurrenceString(needle, haystack),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: FirstOccurrenceString.toString(),
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
    id: 33,
    title: "Prefix / Infix / Postfix",
    difficulty: "Easy",
    category: "String",
    functions: (string: string, option: string) =>
      PrefixInfixPostfix(string, option),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: PrefixInfixPostfix.toString(),
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
    id: 34,
    title: "MaxSubArrSum",
    difficulty: "Hard",
    category: "String",
    functions: (arr: string) =>
      MaxSubArrSum(textToArray(arr, "number") as number[]),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: MaxSubArrSum.toString(),
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
    id: 35,
    title: "Search Insert Position",
    difficulty: "Easy",
    category: "Array",
    functions: (arr: string, target: number) =>
      SearchInsertPosition(textToArray(arr, "number") as number[], target),
    type: "return",
    sourceCode: {
      cpp: "not-yet-parsed",
      js: SearchInsertPosition.toString(),
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
    id: 36,
    title: "First Bad Version",
    difficulty: "Easy",
    category: "Binary Search",
    functions: (n: number, badVersion: number) =>
      FirstBadVersion(n, badVersion),
    type: "return",
    sourceCode: {
      cpp: FirstBadVersionCpp,
      js: FirstBadVersion.toString(),
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
];
export default problemDetails;
