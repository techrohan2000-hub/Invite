type PetalsProps = {
  mode: "off" | "drift" | "burst"
}

const COLORS = ["#e89aaa", "#f0c4c8", "#f5e6d3", "#e8a04a", "#f3d9a0", "#d4e0c8"]

const BURST = Array.from({ length: 28 }, (_, i) => ({
  left: `${3 + ((i * 13) % 94)}%`,
  delay: `${(i % 10) * 0.12}s`,
  duration: `${4.2 + (i % 6) * 0.45}s`,
  rotate: i % 2 === 0 ? "22deg" : "-28deg",
  color: COLORS[i % COLORS.length],
  size: 8 + (i % 5) * 2,
  shape: i % 3,
}))

const DRIFT = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + ((i * 19) % 84)}%`,
  delay: `${(i % 7) * 0.9}s`,
  duration: `${14 + (i % 5) * 2.2}s`,
  rotate: i % 2 === 0 ? "14deg" : "-18deg",
  color: COLORS[i % COLORS.length],
  size: 7 + (i % 4),
  shape: i % 3,
}))

export function Petals({ mode }: PetalsProps) {
  if (mode === "off") return null

  const list = mode === "burst" ? BURST : DRIFT
  const className = mode === "burst" ? "petals petals-burst" : "petals petals-drift"

  return (
    <div className={className} aria-hidden="true">
      {list.map((p, index) => (
        <span
          key={`${mode}-${index}`}
          className={`petal-bit petal-shape-${p.shape}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            background: p.color,
            width: p.size,
            height: p.size * 1.35,
            ["--tilt" as string]: p.rotate,
          }}
        />
      ))}
    </div>
  )
}
