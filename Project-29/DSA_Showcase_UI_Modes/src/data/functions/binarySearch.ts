export function FirstBadVersion(n: number, badVersion:number) {
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
};

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
}
`;

