export interface Challenge {
  cId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'classic' | 'modern' | 'protocol';
  xpReward: number;
  prompt: string;
  hint1: string;
  hint2?: string;
  solution: string;
  explanation: string;
}

export const challenges: Challenge[] = [
  {
    cId: 'caesar-1',
    title: 'Caesar\'s Message',
    description: 'Decrypt a message encrypted with Caesar cipher (shift of 3)',
    difficulty: 'easy',
    category: 'classic',
    xpReward: 100,
    prompt: 'Fulswrjudskb lv ixq',
    hint1: 'Try shifting each letter back by 3 positions in the alphabet',
    hint2: 'C becomes Z, D becomes A, etc. when shifting back',
    solution: 'criptography is fun',
    explanation: 'Caesar cipher shifts each letter by a fixed number. Here, shift=3 was used. To decrypt, shift back by 3 (or forward by 23). This cipher is extremely weak and should never be used for real security.',
  },
  {
    cId: 'vigenere-1',
    title: 'Vigenère Challenge',
    description: 'Crack a Vigenère cipher with a known key',
    difficulty: 'medium',
    category: 'classic',
    xpReward: 200,
    prompt: 'Decrypt this message using the key "KEY": "Rijvs gq s ztqkisnlci"',
    hint1: 'The Vigenère cipher uses the key repeated over the message',
    hint2: 'For each letter, shift back by the corresponding key letter value (K=10, E=4, Y=24)',
    solution: 'hello is a plaintext',
    explanation: 'Vigenère cipher uses a repeating key. Each letter is shifted by the corresponding key letter. To decrypt, subtract the key shifts. While stronger than Caesar, it\'s still vulnerable to frequency analysis and known-plaintext attacks.',
  },
  {
    cId: 'frequency-1',
    title: 'Frequency Analysis',
    description: 'Use frequency analysis to break a substitution cipher',
    difficulty: 'medium',
    category: 'classic',
    xpReward: 250,
    prompt: 'Decrypt: "Wkh txlfn eurzq iri mxpsv ryhu wkh odcb grj"',
    hint1: 'The most common letter in English is E. Look for the most frequent letter in the ciphertext',
    hint2: 'This is actually a Caesar cipher with shift 3. Try different shifts!',
    solution: 'the quick brown fox jumps over the lazy dog',
    explanation: 'Frequency analysis exploits the fact that letters appear at different frequencies in natural language. In English, E, T, A, O, I, N are most common. By analyzing letter frequencies in ciphertext, you can often deduce the substitution pattern.',
    // validateSolution: (input: string) => {
    //   const cleaned = input.toLowerCase().replace(/[^a-z]/g, '');
    //   return cleaned === 'thequickbrownfoxjumpsoverthelazydog';
    // },
  },
  {
    cId: 'hash-collision',
    title: 'Hash Understanding',
    description: 'Answer questions about hash functions',
    difficulty: 'easy',
    category: 'modern',
    xpReward: 150,
    prompt: 'What is the key property that makes hash functions useful for password storage? (one word)',
    hint1: 'Think about whether you can reverse a hash back to the original input',
    hint2: 'The property starts with "one-way"...',
    solution: 'irreversible',
    explanation: 'Hash functions are one-way (irreversible). You cannot feasibly compute the input from the output. This makes them perfect for password storage - you hash the password and store the hash. When verifying, you hash the input and compare hashes.',
    // validateSolution: (input: string) => {
    //   const cleaned = input.toLowerCase().trim();
    //   return cleaned === 'irreversible' || cleaned === 'oneway' || cleaned === 'one-way';
    // },
  },
  {
    cId: 'aes-understanding',
    title: 'AES Security',
    description: 'Identify the security issue in AES usage',
    difficulty: 'medium',
    category: 'modern',
    xpReward: 200,
    prompt: 'What must NEVER be reused when encrypting multiple messages with the same AES-GCM key? (two letters)',
    hint1: 'Think about the random value used in each encryption',
    hint2: 'Initialization Vector...',
    solution: 'iv',
    explanation: 'The Initialization Vector (IV) or nonce must be unique for each encryption with the same key. Reusing an IV with AES-GCM completely breaks the security, allowing attackers to decrypt messages or forge authenticated data. Always generate a fresh random IV for each encryption.',
    // validateSolution: (input: string) => {
    //   const cleaned = input.toLowerCase().trim();
    //   return cleaned === 'iv' || cleaned === 'nonce' || cleaned === 'initializationvector';
    // },
  },
  {
    cId: 'rsa-understanding',
    title: 'RSA Key Size',
    description: 'Understanding RSA security parameters',
    difficulty: 'hard',
    category: 'modern',
    xpReward: 300,
    prompt: 'What is the minimum recommended RSA key size in bits for modern security? (number only)',
    hint1: 'It\'s a power of 2 and greater than 1024',
    hint2: 'Common choices are 2048, 3072, or 4096',
    solution: '2048',
    explanation: 'RSA keys should be at least 2048 bits for current security standards. 1024-bit keys are considered broken and can be factored with sufficient resources. Many organizations recommend 3072 or 4096 bits for long-term security. Larger keys are more secure but slower.',
    // validateSolution: (input: string) => {
    //   const cleaned = input.trim();
    //   return cleaned === '2048' || cleaned === '3072' || cleaned === '4096';
    // },
  },
];