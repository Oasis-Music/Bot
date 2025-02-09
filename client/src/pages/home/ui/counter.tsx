export function Counter({ text, counter }: { text: string; counter: number }) {
  return (
    <div className="flex justify-between pb-1 font-medium text-gray-200">
      <span>{text}</span>
      <div className="relative w-full after:absolute after:top-[50%] after:left-1/2 after:h-0.5 after:w-[80%] after:-translate-x-2/4 after:bg-gray-300" />
      <span>
        {counter}/{import.meta.env.VITE_APP_MAX_TRACK_AVAILABLE}
      </span>
    </div>
  )
}
