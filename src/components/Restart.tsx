
const Restart = ({func}: {func: () => void}) => {
  return (
    <button className="gradient-border right-10 top-20 cursor-pointer text-xl font-semibold" onClick={func}>
      Restart
    </button>
  )
}

export default Restart
