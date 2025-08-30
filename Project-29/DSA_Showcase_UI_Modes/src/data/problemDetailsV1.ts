export interface ProblemDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  inputs: {
    type: "text" | "number";
    label: string;
    name: string;
    placeholder?: string;
    value?: [];
  }[];
  functions: string[];
  sourceCode: {
    [language: string]: string;
  };
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}

export const problemDetails: ProblemDetail[] = [
  {
    id: "1",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    category: "Array",
    difficulty: "Easy",
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
    functions: ["twoSum(nums, target)"],
    sourceCode: {
      js: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};`,
      python: `def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
    },
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["Hash Table", "Array"],
  },
];
