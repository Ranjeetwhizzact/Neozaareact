"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (!saved) {
      setShowBanner(true);
    }
  }, []);

const savePreferences = (prefs) => {
  const data = {
    ...prefs,
    savedAt: new Date().getTime(),
  };
  localStorage.setItem("cookie-consent", JSON.stringify(data));
  setShowBanner(false);
  setShowModal(false);
};

useEffect(() => {
  const saved = localStorage.getItem("cookie-consent");
  if (saved) {
    const data = JSON.parse(saved);
    const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in ms
    if (new Date().getTime() - data.savedAt > sixMonths) {
      setShowBanner(true); // expired, show banner
    }
  } else {
    setShowBanner(true); // first visit
  }
}, []);

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    savePreferences({ necessary: true, analytics: false, marketing: false });
  };

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[700px] bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-3 z-50">
          <p className="text-sm text-gray-700">
            We use cookies to ensure proper site functionality and to understand
            how you use our website.{" "}
            <button
              className="underline text-blue-600"
              onClick={() => setShowModal(true)}
            >
              Let me choose
            </button>
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 w-32"
              onClick={handleRejectAll}
            >
              Reject all
            </button>
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-32"
              onClick={handleAcceptAll}
            >
              Accept all
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[500px] shadow-xl text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Cookie Preferences</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              We use cookies to ensure the basic functionalities of the website
              and to enhance your online experience. You can choose for each
              category to opt-in/out.
            </p>

            {/* Strictly Necessary */}
            <div className="flex items-center justify-between py-2 border-b">
              <span>Strictly necessary cookies</span>
              <span className="text-sm text-gray-500">Always active</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-2 border-b">
              <span>Analytics cookies</span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between py-2">
              <span>Marketing cookies</span>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={handleRejectAll}
              >
                Reject all
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => savePreferences(preferences)}
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}