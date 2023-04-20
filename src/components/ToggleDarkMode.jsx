import React, { useState, useEffect } from "react";

function ToggleDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div>
      <button onClick={toggleMode}>Cambiar Modo</button>
    </div>
  );
}

export default ToggleDarkMode;
