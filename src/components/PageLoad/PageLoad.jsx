import { useEffect, useState } from "react";

import {
  markPageLoadSeen,
  shouldShowPageLoad,
} from "./pageLoadState";
import "./pageload.css";

const PAGELOAD_DURATION_MS = 1800;

function PageLoad() {
  const [isVisible, setIsVisible] = useState(shouldShowPageLoad);

  function dismissIntro() {
    setIsVisible(false);
  }

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    markPageLoadSeen();

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false);
    }, PAGELOAD_DURATION_MS);

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pageload">
      <button type="button" className="pageload__skip" onClick={dismissIntro}>
        Skip intro
      </button>
      <div className="pageload__terminal">
        <p className="pageload__command">
          <span className="pageload__prompt">{">"}</span>
          <span className="pageload__typed">deploy portfolio --polish</span>
        </p>

        <div className="pageload__result">
          <span className="pageload__urlShell">
            <span className="pageload__url">
              mohamedadel.dev
            </span>
            <svg
              className="pageload__clickBurst"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M14.1594 5.4903L16 3.65882" />
              <path d="M1 9.62524H3.79196" />
              <path d="M9.66827 3.77808V0.999976" />
              <path d="M5.39831 5.38721L3.4241 3.42279" />
              <path d="M3.59725 16L5.57146 14.0356" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PageLoad;
