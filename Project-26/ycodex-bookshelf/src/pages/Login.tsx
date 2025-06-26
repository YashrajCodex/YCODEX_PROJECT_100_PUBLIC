import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addUser } from "@/components/User/userSlice";
import { setBooksKey } from "@/components/bookshelf/bookshelfSlice";
import { useAuth } from "@/hooks/useAuth";

const imageLinks = [
  {
    src: "https://images.unsplash.com/photo-1750173360515-05ca2fb9873d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "sunlight-bathes-golden-trees",
  },
  {
    src: "https://images.unsplash.com/photo-1750190437388-862aeca97f9e?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "snow-capped-mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "sun-light-passing",
  },
  {
    src: "https://images.unsplash.com/photo-1749920937484-a61e6a9566a9?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "mountains-stand",
  },
];
const loginSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  Profile_Image_Link: z.string().url("This must be an url."),
  key: z.string().uuid("This should be an uuid key")
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    userName: "",
    email: "",
    password: "",
    // image: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState('')

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const {isAuthenticated, toggleAuthenticated} = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = uuidv4();
    const loginData = {...formData, Profile_Image_Link: selectedImage, key: key}
    try {
      loginSchema.parse(loginData);
      // console.log("Login successful:", loginData);

      dispatch(addUser(loginData));
      dispatch(setBooksKey(key))
      // toggleAuthenticated()
      navigate("/bookshelf", {replace: true})
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Partial<LoginForm> = {};
        // console.log(error)
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof LoginForm] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/bookshelf", { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-primary font-bold text-accent hover:text-hover-glow transition-colors"
          >
            BookFury
          </Link>
          <p className="text-text-secondary mt-2">
            Welcome back to your reading journey
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-effect rounded-lg p-8 shadow-xl">
          <h2 className="text-2xl font-primary font-bold text-text-primary mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="text"
                  id="username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your username"
                />
              </div>
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-text-primary placeholder-text-secondary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Image Field */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-text-primary mb-2"
              >Profile Image</label>
              <div className="flex flex-wrap justify-center gap-1 w-full">
                {imageLinks.map((image) => (
                  <div
                    onClick={()=>setSelectedImage(image.src)}
                    key={image.alt}
                    className={`w-20 h-20 rounded-full overflow-hidden bg-bg-surface border-4 border-accent border-opacity-20 opacity-${selectedImage === image.src ? 100 : 85}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent text-white py-3 rounded-lg hover:bg-hover-glow transition-colors font-medium glow-hover"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
