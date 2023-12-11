import React, { createContext, useState, useEffect, useContext } from 'react';


function InfoPopup({message, isGood})
{
  return(
    <div className={`popup ${isGood?'good':'bad'}`}>
    {message}
    </div>
  )
}

// Create a context
const InfoPopupContext = createContext();

// Create a provider component
export const InfoPopupProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isGood, setGood] = useState()

  const showPopup = (msg, isgood=true) => {
    setMessage(msg);
    setIsVisible(true);
    setGood(isgood)

    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <InfoPopupContext.Provider value={{ showPopup }}>
      {children}
      {isVisible && <InfoPopup message={message} isGood={isGood} />}
    </InfoPopupContext.Provider>
  );
};

// Create a consumer hook
export const useInfoPopup = () => {
  return useContext(InfoPopupContext);
};
