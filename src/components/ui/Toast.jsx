"use client";

import { useEffect, useState } from "react";

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-0 transform right-10 z-50 bg-zinc-900 text-white px-6 py-3 rounded shadow-lg border border-green-500 max-w-[90%] text-center">
      {message.includes("No extension") ? (
        <>
          Polkadot.js extension not found.{" "}
          <a
            href="https://polkadot.js.org/extension/"
            target="_blank"
            className="underline text-green-400"
          >
            Install it here →
          </a>
        </>
      ) : (
        message
      )}
    </div>
  );
}
