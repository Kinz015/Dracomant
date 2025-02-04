import { useState } from "react";

export default function useVisiblePass() {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visiblePassConfirm, setVisiblePassConfirm] = useState(false);

  return {
    visiblePass,
    setVisiblePass,
    visiblePassConfirm,
    setVisiblePassConfirm,
  };
}
