export function Icon({ name }: { name: "heart" | "arrow" | "out" | "mail" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "heart" && (
        <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9Z" />
      )}
      {name === "arrow" && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === "out" && <path d="M7 17 17 7M9 7h8v8" />}
      {name === "mail" && (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
    </svg>
  );
}
