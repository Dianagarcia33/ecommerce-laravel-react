export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-lime-400/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl"></div>
    </div>
  )
}
