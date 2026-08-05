/** The red status chip from the design. Uppercase is allowed here: the brand
 *  reserves it for compact status language, which is exactly what this is. */
export function BreakingChip({ label = 'BREAKING' }: { label?: string }) {
  return (
    <span className="breaking">
      <svg width="9" height="12" viewBox="0 0 24 30" aria-hidden="true" focusable="false">
        <path d="M14 1.5 3.5 16.5H10L7.5 28.5 20.5 12H14z" fill="currentColor" />
      </svg>
      {label}
    </span>
  )
}
