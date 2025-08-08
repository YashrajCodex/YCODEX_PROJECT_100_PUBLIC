import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, LogIn, Mail, UserCircle } from 'lucide-react';
import { useKeyboardShortcuts } from '@/utils/keyboard';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useKeyboardShortcuts({
    'ctrl+l': () => handleSubmit()
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.username || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Username and email are required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = await login(formData.username, formData.email, formData.password);
    
    if (success) {
      toast({
        title: "Welcome!",
        description: `Successfully logged in as ${formData.username}`
      });
    } else {
      toast({
        title: "Login Failed",
        description: "There was an error logging you in",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-md mx-auto mt-12"
    >
      <Card>
        <CardHeader className="text-center">
          <LogIn className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold">Welcome to Expense Tracker</h2>
          <p className="text-muted-foreground">Sign in to manage your finances</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Press Ctrl+L to quickly sign in
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const UserProfile = () => {
  const { state, logout } = useAuth();

  useKeyboardShortcuts({
    'ctrl+l': () => logout()
  });

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>⌨️ Ctrl+L: Logout</p>
          <p>⌨️ Alt+U: Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserCircle className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Account Information</h3>
                <p className="text-sm text-muted-foreground">Your personal details</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{state.user?.username}</p>
                <p className="text-sm text-muted-foreground">Username</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{state.user?.email}</p>
                <p className="text-sm text-muted-foreground">Email Address</p>
              </div>
            </div>

            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Manage your data and preferences</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Import Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download Reports
            </Button>
            <Button variant="outline" className="w-full justify-start text-danger border-danger hover:bg-danger hover:text-danger-foreground">
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Account Statistics</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">5</p>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Receipts Created</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-muted-foreground">30</p>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const UserPage = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <LoginForm />;
  }

  return <UserProfile />;
};

export default UserPage;