import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register,getMe,logout } from "../services/auth.api.js";
import { toast } from "sonner";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login( email, password );
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
    finally {
      setLoading(false);
    }
  }

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register( username, email, password );
      setUser(data.user);
      toast.success(data.message);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "User registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("User Logout failed");
    } finally {
      setLoading(false);
    }
    
    
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(async () => {
      getAndSetUser();
    }, 500);

    
  }, []);

  return { user, loading, handleLogin, handleLogout, handleRegister };



}