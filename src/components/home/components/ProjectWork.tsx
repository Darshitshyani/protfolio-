import React from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { FolderCopy } from "@mui/icons-material";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const stats = [
  {
    icon: <HomeWorkIcon style={{ fontSize: "40px" }} className="sm:text-[50px]" />,
    value: "3+ Years in",
    label: "Industry",
  },
  {
    icon: <SignalCellularAltIcon style={{ fontSize: "40px" }} className="sm:text-[50px]" />,
    value: "10+ Happy",
    label: "Clients",
  },
  {
    icon: <FolderCopy style={{ fontSize: "40px" }} className="sm:text-[50px]" />,
    value: "20+ Completed",
    label: "Projects",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const ProjectWork = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full mb-[40px] px-4"
    >
      <div className="flex flex-wrap gap-8 items-center justify-center md:justify-around">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-4 sm:gap-6 group hover:scale-105 transition-transform duration-300 cursor-default"
          >
            <div className={cn(
              "w-[75px] h-[75px] sm:w-[85px] sm:h-[85px]",
              "flex items-center justify-center rounded-2xl",
              "text-pink-600 bg-pink-100/50 backdrop-blur-sm",
              "border border-pink-200 shadow-lg group-hover:shadow-pink-200/50",
              "transition-all duration-300"
            )}>
              {item.icon}
            </div>
            <div className="flex flex-col items-center sm:items-start space-y-1">
              <h3 className="font-bold text-[18px] sm:text-[20px] text-gray-800">
                {item.value}
              </h3>
              <h3 className="font-medium text-[16px] sm:text-[18px] text-gray-500">
                {item.label}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectWork;
