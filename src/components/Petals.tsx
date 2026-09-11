type PetalsProps = {
  active: boolean
}

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: `${6 + ((i * 17) % 90)}%`,
  delay: `${(i % 9) * 0.18}s`,
  duration: `${5 + (i % 5)}s`,
  rotate: i % 2 === 0 ? "18deg" : "-22deg",
  color: i % 3 === 0 ? "#c4a35a" : i % 3 === 1 ? "#e8c4b8" : "#f6efe4",
}))

export function Petals({ active }: PetalsProps) {
  if (!active) return null

  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p) => (
        <span
          key={`${p.left}-${p.delay}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
            ["--tilt" as string]: p.rotate,
          }}
        />
      ))}
    </div>
  )
}
