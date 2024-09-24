import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [searchString, setSearchString] = useState("");
  const [replaceString, setReplaceString] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // Function to handle text change in the textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Function to count unique words (case-insensitive)
  const getUniqueWordCount = (inputText) => {
    const words = inputText
      .toLowerCase()
      .match(/\b\w+\b/g); // Extract words
    if (!words) return 0;
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  // Function to count characters excluding spaces and punctuation
  const getCharacterCount = (inputText) => {
    const letters = inputText.replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
    return letters.length;
  };

  // Function to handle string replacement
  const handleReplaceAll = () => {
    if (!searchString) return;

    const regex = new RegExp(searchString, "g");
    const replacedText = text.replace(regex, replaceString);

    // Highlight replaced text
    const highlighted = replacedText.replace(
      new RegExp(replaceString, "g"),
      `<mark>${replaceString}</mark>`
    );

    setText(replacedText);
    setHighlightedText(highlighted);
  };

  useEffect(() => {
    // Update highlighted text when text changes
    const highlighted = text.replace(
      new RegExp(searchString, "g"),
      `<mark>${searchString}</mark>`
    );
    setHighlightedText(highlighted);
  }, [text, searchString]);

  return (
    <div className="app-container">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      <div className="input-section">
        {/* Textarea for user input */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type your text here..."
          className="text-area"
        />
        
        {/* Display highlighted text */}
        <div
          className="highlighted-text-container"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      </div>

      {/* Display stats */}
      <div className="stats">
        <p>Unique Word Count: {getUniqueWordCount(text)}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {getCharacterCount(text)}</p>
      </div>

      {/* String replacement inputs */}
      <div className="string-replacement">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for..."
          className="input-field"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with..."
          className="input-field"
        />
        <button onClick={handleReplaceAll} className="replace-button">
          Replace All
        </button>
      </div>
    </div>
  );
};

export default App;
