import React, { useState } from "react";
import "./LanguageDiv.css";

function LanguageDiv({ value }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const languages = [
    "Chinese", "Japanese", "Korean", "French", "Spanish", 
    "Portuguese", "Russian", "Ukrainian", "Arabic", "Hindi"
  ];

  const handleLanguageClick = (language) => {
    const newValue = selectedLanguage === language ? "" : language;
    setSelectedLanguage(newValue);
    value(newValue);
  };

  return (
    <div className="language-div">
      <div className="language-selections">
        {languages.map((language) => (
          <button 
            key={language} 
            className={`language-button ${selectedLanguage === language ? 'selected' : ''}`} 
            onClick={() => handleLanguageClick(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageDiv;