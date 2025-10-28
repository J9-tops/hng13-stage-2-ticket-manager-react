import { Eye, EyeOff } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { AuthFormErrors, AuthInFormData } from "../types";
import { validateSignIn } from "../utils";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<AuthInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const currentUser = localStorage.getItem("ticketapp_session");
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "email") {
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Enter a valid email address.";
        } else {
          delete newErrors.email;
        }
      }

      if (name === "password") {
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters long.";
        } else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateSignIn(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const usersJSON = localStorage.getItem("users");
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      const emailExists = users.some(
        (user: AuthInFormData) => user.email === formData.email
      );

      if (emailExists) {
        toast.error("Email already registered. Please sign in.");
        setErrors({ email: "This email is already registered" });
        return;
      }

      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("ticketapp_session", JSON.stringify(formData));

      toast.success("Account Created Successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      toast.error("Please fix the form errors");
    }
  };

  return (
    <div className="auth page-container">
      <div className="page-content">
        <div className="form-wrapper">
          <div className="signin-card">
            <Link to="/" className="logo-section">
              <div className="logo-icon">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h2 className="logo-text">TicketFlow</h2>
            </Link>

            <h1 className="page-title">Create Your Account</h1>

            <form className="form-section" onSubmit={handleSubmit} noValidate>
              <label className="form-label">
                <span className="label-text">Email</span>
                <input
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  type="email"
                  name="email"
                  placeholder="jim@abc.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </label>

              <label className="form-label">
                <span className="label-text">Password</span>
                <div
                  className={`password-field ${
                    errors.password ? "input-error" : ""
                  }`}
                >
                  <input
                    className="form-input"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="password-icon"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </label>

              <button type="submit" className="signin-button">
                Sign Up
              </button>
            </form>

            <p className="footer-text">
              Already have an account?
              <Link to="/auth/login" className="footer-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
