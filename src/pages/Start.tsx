import starting from "../images/starting.jpg"
import PlayButton from "../components/PlayButton"
import Heading from "../components/Heading"

const Start = () => {
  return (
     <div className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${starting})`, backgroundPosition: "center", backgroundSize: "cover" }}>
      
      
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center">
        <Heading />

        <PlayButton />
      </div>
    </div>
  )
}

export default Start
