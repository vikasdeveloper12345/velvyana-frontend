import { useEffect, useRef, useState } from "react";

const AUTO_DISMISS_MS = 3000;

const Toast = ({ message, type = "error", onClose }) => {
  const [visible, setVisible] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onCloseRef.current?.(), 200);
  };

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return undefined;
    }
    setVisible(true);
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-200 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${type === "error" ? "bg-red-900/90 border border-red-500 text-red-100" : "bg-green-900/90 border border-green-500 text-green-100"}`}
    >
      {message}
    </div>
  );
};

export default Toast;
