import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignInSignOut() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate()
  const { login, logout, isSignedIn, email: authEmail } = useAuth();

  const handleLogin = () => {
    login(email, password);
    setError("");
    Navigate("/")
  };
  const handleSignOut = () => {
    logout();
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <Card className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          {!isSignedIn ? (
            <>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <LogIn className="text-blue-600" /> Sign In
              </h2>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full" onClick={handleLogin}>
                  Sign In
                </Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <LogOut className="text-green-600" /> Welcome Back!
              </h2>
              <p className="mb-4">
                You are signed in as <strong>{authEmail}</strong>.
              </p>
              <Button
                className="w-full"
                variant="destructive"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
