import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useUserStore } from "../storage/zustand";
import { checkAuth } from "../server_actions/checkAuth";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const validateAuth = async () => {
      const user = await checkAuth();
      setUser(user);
      setIsAuthenticated(!!user);
    };

    validateAuth();
  }, []);

  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    if (
      isAuthenticated === false &&
      !pathname?.includes("/login") &&
      !pathname?.includes("/register")
    )
      navigate("/login");

    if (
      isAuthenticated === true &&
      (pathname?.includes("/login") || pathname?.includes("/register"))
    )
      navigate(`/${user?.role}`);
  }, [isAuthenticated, pathname]);

  if (isAuthenticated === null) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <motion.div
          animate="pulse"
          transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
          className="flex justify-center items-center gap-[12px]"
        >
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
            variants={dotVariants}
          />
          <motion.div
            className="w-[7px] h-[7px] my-[3.5px] rounded-full bg-blue-500 will-change-transform"
            variants={dotVariants}
          />
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
