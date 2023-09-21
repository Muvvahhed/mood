const Spinner = ({ text, size }: { text?: string; size?: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-4 h-4 border-t-2 border-l-2 border-primary-green rounded-full border-dotted animate-spin"></div>
      {text && <span className="text-primary-green">{text}</span>}
    </div>
  )
}

export default Spinner
