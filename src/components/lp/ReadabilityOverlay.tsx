/** Fixed overlay: transparent sides, soft white center band for text legibility over particles. */
export function ReadabilityOverlay() {
  return (
    <div className="absolute inset-0 flex justify-center" aria-hidden>
      <div
        className="h-full w-full max-w-6xl"
        style={{
          background: `
            linear-gradient(
              to right,
              transparent 0%,
              rgb(255 255 255 / 0.55) 5%,
              rgb(255 255 255 / 0.88) 10%,
              white 16%,
              white 84%,
              rgb(255 255 255 / 0.88) 90%,
              rgb(255 255 255 / 0.55) 95%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  );
}
