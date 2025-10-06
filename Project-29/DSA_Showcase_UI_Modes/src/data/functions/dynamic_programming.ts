export function wordBreak(s: string, wordDict: string[]) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;   //empty string can always be segmented
    for (let i = 1; i <= s.length; i++){
        for (let j = 0; j < i; j++){
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;            }

        }
    }
    return dp[s.length];
}

export const wordBreakCPP = `
#include <bits/stdc++.h>
using nampespace std;

bool wordBreak (string s, vector<string>& wordDict){
    unordered_set<string> wordSet(wordDict.begin(), wordDict(end));
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;

    for(int i = 1; i <= s.size(); i++){
        for(int j = 0; j < i; j++){
            if(dp[j] && wordSet.count(s.substr(j, i - j))){
                dp[i] true;
                break;
            }
        }
    }
        return dp[s.size()];
}
`