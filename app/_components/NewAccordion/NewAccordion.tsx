import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Assuming you are using Next.js

const accordionVariants = {
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

interface NewAccordionProps {
  icon?: React.ReactNode; // Optional icon
  title?: string;
  isOpen?:boolean;
  children: React.ReactNode;
}

export const NewAccordion: React.FC<NewAccordionProps> = ({
  
  children,
  isOpen
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  

  return (
    <div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={accordionVariants}
            className="accordion-content bg-[#E8F2EC]  flex flex-col items-center justify-center gap-2 p-1 py-2   px-2"
          >
          
           {children}
          
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};








///new code here