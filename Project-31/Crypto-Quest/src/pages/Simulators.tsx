import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Lock, Key, CheckCircle, Eye } from 'lucide-react';

type SimulatorType = 'tls' | 'jwt';

export default function Simulators() {
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType | null>(null);
  const [tlsStep, setTlsStep] = useState(0);
  const [jwtTab, setJwtTab] = useState<'create' | 'verify'>('create');

  const simulators = [
    {
      id: 'tls' as SimulatorType,
      title: 'TLS Handshake',
      description: 'Visualize how secure connections are established',
      icon: Shield,
    },
    {
      id: 'jwt' as SimulatorType,
      title: 'JWT Tokens',
      description: 'See how JSON Web Tokens are created and verified',
      icon: Key,
    },
  ];

  const tlsSteps = [
    {
      title: 'Client Hello',
      description: 'Client sends supported cipher suites and a random nonce',
      parties: ['client'],
      details: 'The client initiates the connection by sending: supported TLS versions, cipher suites, compression methods, and a random value (Client Random).',
    },
    {
      title: 'Server Hello',
      description: 'Server responds with chosen cipher suite and certificate',
      parties: ['server'],
      details: 'Server responds with: selected cipher suite, server certificate (containing public key), and Server Random value.',
    },
    {
      title: 'Certificate Verification',
      description: 'Client verifies server certificate with CA',
      parties: ['client'],
      details: 'Client validates the server certificate chain against trusted Certificate Authorities (CAs) to ensure authenticity.',
    },
    {
      title: 'Key Exchange',
      description: 'Client and server exchange keys using Diffie-Hellman',
      parties: ['client', 'server'],
      details: 'Both parties use Diffie-Hellman (or ECDH) to agree on a shared secret (Pre-Master Secret) without transmitting it.',
    },
    {
      title: 'Session Keys Derived',
      description: 'Both derive symmetric session keys from shared secret',
      parties: ['client', 'server'],
      details: 'Using Client Random, Server Random, and Pre-Master Secret, both derive identical session keys for encryption.',
    },
    {
      title: 'Secure Connection Established',
      description: 'All future communication is encrypted with session keys',
      parties: ['client', 'server'],
      details: 'The handshake is complete. All subsequent data is encrypted with AES (or other symmetric algorithm) using the session keys.',
    },
  ];

  function nextTlsStep() {
    if (tlsStep < tlsSteps.length - 1) {
      setTlsStep(tlsStep + 1);
    }
  }

  function resetTls() {
    setTlsStep(0);
  }

  if (!activeSimulator) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gradient mb-4">Protocol Simulators</h1>
            <p className="text-muted-foreground">
              Interactive visualizations of cryptographic protocols in action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {simulators.map((sim, index) => {
              const Icon = sim.icon;
              return (
                <motion.div
                  key={sim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => setActiveSimulator(sim.id)}
                  className="bg-card border border-border rounded-xl p-8 cursor-pointer hover:border-primary/50 transition-all"
                >
                  <div className="p-4 bg-primary/10 rounded-lg inline-block mb-4">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{sim.title}</h3>
                  <p className="text-muted-foreground">{sim.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (activeSimulator === 'tls') {
    const currentStep = tlsSteps[tlsStep];
    const isComplete = tlsStep === tlsSteps.length - 1;

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <button
            onClick={() => setActiveSimulator(null)}
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Simulators
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">TLS Handshake Simulator</h1>
              <p className="text-muted-foreground">
                Step {tlsStep + 1} of {tlsSteps.length}
              </p>
            </div>

            <div className="relative mb-12">
              <div className="flex justify-between items-start mb-16">
                <motion.div
                  animate={currentStep.parties.includes('client') ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-primary">
                    <Eye className="text-primary" size={40} />
                  </div>
                  <p className="font-semibold">Client</p>
                </motion.div>

                <div className="flex-1 flex items-center justify-center px-8 mt-10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-0.5 w-full bg-gradient-to-r from-primary to-accent"
                  />
                  <ArrowRight className="text-primary mx-2" size={24} />
                </div>

                <motion.div
                  animate={currentStep.parties.includes('server') ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-accent">
                    <Shield className="text-accent" size={40} />
                  </div>
                  <p className="font-semibold">Server</p>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tlsStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-secondary/50 border border-border rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {isComplete ? (
                      <CheckCircle className="text-success" size={24} />
                    ) : (
                      <Lock className="text-primary" size={24} />
                    )}
                    <h3 className="text-xl font-bold">{currentStep.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">{currentStep.description}</p>
                  <div className="bg-background/50 rounded p-4 border border-border">
                    <p className="text-sm leading-relaxed">{currentStep.details}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3">
              {!isComplete ? (
                <button
                  onClick={nextTlsStep}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={resetTls}
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg"
                >
                  Start Over
                </button>
              )}
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg"
              >
                <p className="text-success font-medium mb-2">✓ Handshake Complete!</p>
                <p className="text-sm text-muted-foreground">
                  The client and server have securely established a connection. All data is now encrypted end-to-end.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  if (activeSimulator === 'jwt') {
    const exampleHeader = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);
    const examplePayload = JSON.stringify(
      { sub: '1234567890', name: 'CryptoQuest User', iat: 1516239022 },
      null,
      2
    );
    const exampleSignature = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <button
            onClick={() => setActiveSimulator(null)}
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Simulators
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">JWT Token Simulator</h1>
              <p className="text-muted-foreground">
                Understand how JSON Web Tokens work
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setJwtTab('create')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  jwtTab === 'create'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                Create JWT
              </button>
              <button
                onClick={() => setJwtTab('verify')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  jwtTab === 'verify'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                Verify JWT
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={jwtTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {jwtTab === 'create' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                          1
                        </span>
                        Header (Algorithm & Type)
                      </h3>
                      <div className="bg-secondary/50 border border-border rounded-lg p-4 font-mono text-sm">
                        <pre className="text-primary">{exampleHeader}</pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Base64Url encoded: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                          2
                        </span>
                        Payload (Claims/Data)
                      </h3>
                      <div className="bg-secondary/50 border border-border rounded-lg p-4 font-mono text-sm">
                        <pre className="text-accent">{examplePayload}</pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Base64Url encoded: eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNyeXB0b1F1ZXN0IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">
                          3
                        </span>
                        Signature (HMAC-SHA256)
                      </h3>
                      <div className="bg-secondary/50 border border-border rounded-lg p-4 font-mono text-sm">
                        <p className="text-success break-all">{exampleSignature}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Generated using: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                      <h3 className="font-semibold mb-3">Complete JWT Token:</h3>
                      <div className="bg-background/50 rounded p-4 font-mono text-xs break-all">
                        <span className="text-primary">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                        <span className="text-foreground">.</span>
                        <span className="text-accent">
                          eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNyeXB0b1F1ZXN0IFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9
                        </span>
                        <span className="text-foreground">.</span>
                        <span className="text-success">{exampleSignature}</span>
                      </div>
                    </div>

                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <p className="text-sm">
                        <strong className="text-warning">⚠️ Security Note:</strong> JWTs are signed, not encrypted.
                        Don't store sensitive data in the payload. Use strong secret keys and rotate them regularly.
                      </p>
                    </div>
                  </div>
                )}

                {jwtTab === 'verify' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">JWT Verification Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-success mt-1" size={20} />
                          <div>
                            <p className="font-medium">1. Parse the Token</p>
                            <p className="text-sm text-muted-foreground">
                              Split the token into header, payload, and signature using "." delimiter
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-success mt-1" size={20} />
                          <div>
                            <p className="font-medium">2. Decode Header & Payload</p>
                            <p className="text-sm text-muted-foreground">
                              Base64Url decode to read the algorithm and claims
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-success mt-1" size={20} />
                          <div>
                            <p className="font-medium">3. Verify Signature</p>
                            <p className="text-sm text-muted-foreground">
                              Recompute signature using header + payload + secret, compare with provided signature
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-success mt-1" size={20} />
                          <div>
                            <p className="font-medium">4. Check Expiration</p>
                            <p className="text-sm text-muted-foreground">
                              Verify the 'exp' claim to ensure token hasn't expired
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                      <h3 className="font-semibold text-success mb-2">✓ Token Valid</h3>
                      <p className="text-sm text-muted-foreground">
                        Signature matches, token hasn't expired, and claims are intact. User is authenticated!
                      </p>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                      <h3 className="font-semibold text-destructive mb-2">✗ Common Failure Cases</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Signature doesn't match (token was tampered with)</li>
                        <li>Token has expired (check 'exp' claim)</li>
                        <li>Algorithm mismatch (header specifies different algorithm)</li>
                        <li>Invalid secret key</li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}