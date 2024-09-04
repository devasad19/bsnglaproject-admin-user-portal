
import { motion, AnimatePresence } from "framer-motion";

const NewUpdatedModal = ({
 
  isOpen,
  onClose,
}) => {
  
  return (
    <>
         
         <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="modal-bg fixed inset-0 z-50 bg-gray-900 bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // onClick={closeModal}
            ></motion.div>

            <motion.div
              className="fixed top-0 left-1/2 z-50 bg-gray-200 rounded-lg shadow-xl w-96 p-6"
              style={{ marginLeft: '-12rem' }}
              initial={{ top: '-400px', opacity: 0 }}
              animate={{ top: '20%', opacity: 1 }}
              exit={{ top: '-400px', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              <a
                href="#"
                className="close text-gray-600 text-xl float-right"
                // onClick={(e) => {
                //   e.preventDefault();
                //   closeModal();
                // }}
              >
                &#215;
              </a>
              <p className="text-gray-700 font-medium mt-8">
                In user interface design, a modal window is a child window that requires users to interact with it before they can return to operating the parent application, thus preventing the workflow on the application main window.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewUpdatedModal;
