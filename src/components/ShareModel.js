import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const ShareModal = ({ isOpen, onClose, copiedUrl }) => {
    const modalStyle = isOpen ? 'block' : 'hidden';
  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(copiedUrl)}`);
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(copiedUrl)}`);
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(copiedUrl)}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${modalStyle}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 cursor-pointer"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <IoCloseOutline icon={['fas', 'times']} className='text-2xl' />
              </button>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Share Resume</h3>
                <div className="mt-2">
                  <button
                    onClick={shareOnWhatsApp}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaWhatsapp className='mr-2 text-lg'/>WhatsApp
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="inline-flex justify-center ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaLinkedin className='mr-2 text-lg'/>LinkedIn
                  </button>
                  <button
                    onClick={shareOnTelegram}
                    className="inline-flex justify-center ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                  >
                    <FaTelegram className='mr-2 text-lg'/>Telegram
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ShareModal;