/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for message context component
*/


import React, { createContext, useState, useEffect, useContext } from 'react';


function InfoPopup({message, isGood})
{
  return <p className={`popup ${isGood ? 'good' : 'bad'}`} dangerouslySetInnerHTML={{ __html: message }} />
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
