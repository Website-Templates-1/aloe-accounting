"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-ink">
        Password
      </label>
      <div className="relative mt-1">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-border-soft py-2 pr-10 pl-3 text-ink"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-body hover:text-ink"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
