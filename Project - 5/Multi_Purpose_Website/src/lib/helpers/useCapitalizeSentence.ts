function useCapitalizeSentence(text: string) {
    const word = text.split(" ")
    if(typeof text !== "string" || word.length <= 1) return "Nothing to capitalize."
    const capitalizedText = text.replace(/(\. )([a-z])/g, (match, p1, p2) => {
        return p1 + p2.toUpperCase();
    })
    return capitalizedText
}

export default useCapitalizeSentence;