import React, { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("You're in. Welcome to the Kaftan Queens circle.");
    setEmail("");
  };

  return (
    <section className="mt-24 md:mt-32 bg-[hsl(var(--kq-bg-2))]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 text-center">
        <span className="text-[11px] tracking-[0.32em] uppercase text-[hsl(var(--kq-accent-2))]">
          — The Kaftan Queens Circle
        </span>
        <h2 className="font-display text-4xl md:text-6xl leading-tight mt-4 max-w-3xl mx-auto">
          10% off your first order
        </h2>
        <div className="mt-4 flex items-center justify-center"><span className="kq-thin-rule" /></div>
        <p className="font-italic text-lg text-[hsl(var(--kq-ink-soft))] mt-6 max-w-xl mx-auto leading-relaxed">
          Join the community for first looks at new pieces, the stories behind our makers, and regular updates on the slow-fashion movement.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[hsl(var(--kq-bg))] border border-[hsl(var(--kq-line))] px-4 py-3.5 text-sm outline-none focus:border-[hsl(var(--kq-accent-2))] placeholder:text-[hsl(var(--kq-ink-soft))]"
          />
          <button
            type="submit"
            className="bg-[hsl(var(--kq-ink))] text-[hsl(var(--kq-bg))] px-7 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[hsl(var(--kq-accent-2))] transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
