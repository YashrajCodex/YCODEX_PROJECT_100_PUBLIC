import { motion } from "framer-motion";
import { Eye, Key, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserData/useUserContext";

export default function NoUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { LoginUser } = useUserContext();

  async function handleStartJourney() {
    const uId = username.split(" ").join("").toLowerCase();
    if (username.trim()) {
      LoginUser(username, uId);
      navigate("/playground");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="p-6 bg-primary/10 rounded-full inline-block">
              <Shield className="text-primary" size={64} />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Welcome to CryptoQuest
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Master cryptography through interactive challenges and hands-on
            learning
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-3">
                <Lock className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Encryption</h3>
              <p className="text-sm text-muted-foreground">
                AES, RSA, and modern encryption algorithms
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-3">
                <Key className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Protocols</h3>
              <p className="text-sm text-muted-foreground">
                TLS, JWT, OAuth, and secure communication
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="p-4 bg-primary/10 rounded-full inline-block mb-3">
                <Eye className="text-primary" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">
                Common vulnerabilities and best practices
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Choose your codename
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleStartJourney()}
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                autoFocus
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartJourney}
              disabled={!username.trim()}
              className="w-full py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.3)" }}
            >
              Begin Your Journey
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
