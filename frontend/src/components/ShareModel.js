import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import {WhatsappIcon,WhatsappShareButton,TelegramIcon,TelegramShareButton,LinkedinShareButton,LinkedinIcon} from 'react-share'
const ShareModel = ({ isOpen, onClose, copiedUrl }) => {
    const modalStyle = isOpen ? 'block' : 'hidden';
    const shareUrl=copiedUrl
    const title="jobseekuser"
  
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
          <div className="bg-white h-60 p-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 cursor-pointer"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <IoCloseOutline icon={['fas', 'times']} className='text-2xl' />
              </button>
              <div className="mt-3 text-center">
                <h3 className="text-xl font-medium leading-6 text-gray-900">Share Resume</h3>
                <div className="flex justify-evenly items-center mt-8  py-8 shadow-lg rounded-md">
                 
                  <div className="mr-4">
                    <LinkedinShareButton
                      url={shareUrl}
                      title={title}
                      className="hover:opacity-80"
                    >
                      <LinkedinIcon size={42} round />
                    </LinkedinShareButton>
                  </div>

                  <div className="mr-4">
                    <WhatsappShareButton                    
                      url={shareUrl}
                      title={title}

                      quote={"subscribe to my channel"}
                      separator=":"
                      className="hover:opacity-80"
                    >
                      <WhatsappIcon size={42} round />
                    </WhatsappShareButton>
                  </div>

                  <div className="mr-4">
                    <TelegramShareButton
                      url={shareUrl}
                      title={title}
                      quote={"subscribe to my channel"}
                      className="hover:opacity-80"
                    >
                      <TelegramIcon size={42} round />
                    </TelegramShareButton>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ShareModel;