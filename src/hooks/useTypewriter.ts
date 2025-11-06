import { useState, useEffect } from "react";

interface UseTypewriterProps {
  prefix?: string;
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export const useTypewriter = ({
  prefix = "",
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: UseTypewriterProps) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const type = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;
      const currentText = text.slice(prefix.length); // Remove prefix when comparing

      if (!shouldDelete && currentText === currentWord) {
        setIsWaiting(true);
        timer = setTimeout(() => {
          setIsDeleting(true);
          setIsWaiting(false);
        }, delayBetweenWords);
        return;
      }

      if (shouldDelete && currentText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      const delta = shouldDelete ? -1 : 1;
      const nextText = shouldDelete
        ? currentText.slice(0, -1)
        : currentWord.slice(0, currentText.length + 1);

      setText(prefix + nextText);
      timer = setTimeout(type, shouldDelete ? deletingSpeed : typingSpeed);
    };

    timer = setTimeout(type, 100);

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    prefix,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  const displayText = text || prefix;
  const showCursor = !isWaiting;

  return { displayText, showCursor };
};
