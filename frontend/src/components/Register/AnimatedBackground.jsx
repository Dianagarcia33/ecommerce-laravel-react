export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full opacity-15 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}
