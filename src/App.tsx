import { useEffect, useState } from "react"

const width: number = 8

const candyColors: string[] = [
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "yellow",
]
  

const App = () => {

  const [currentColorArrangement, setCurrenColorArrangement] = useState<string[]>([])
  const [beingDragged, setBeingDragged] = useState<EventTarget | null>(null)
  const [beingReplaced, setBeingReplaced] = useState<EventTarget | null>(null)

    const checkForColOfFour = () : (boolean | undefined) => {
    for(let i = 0 ; i <= 39; i++){
      const colOfFour : [number, number, number, number] = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor : string = currentColorArrangement[i]

      if(colOfFour.every(square => currentColorArrangement[square] === decidedColor)){
        colOfFour.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }

  const checkForColOfThree = () : (boolean | undefined) => {
    for(let i = 0 ; i <= 47; i++){
      const colOfThree : [number, number, number] = [i, i + width, i + width * 2]
      const decidedColor : string = currentColorArrangement[i]

      if(colOfThree.every(square => currentColorArrangement[square] === decidedColor)){
        colOfThree.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }
    const checkForRowOfFour = () : (boolean | undefined) => {
    for(let i = 0 ; i < 64; i++){
      const colOfRow : [number, number, number, number] = [i, i + 1, i + 2 , i + 3 ]
      const decidedColor : string = currentColorArrangement[i]
      const notValid = [5, 6, 7,13, 14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]

      if(notValid.includes(i)) continue

      if(colOfRow.every(square => currentColorArrangement[square] === decidedColor)){
        colOfRow.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }

  const checkForRowOfThree = () : (boolean | undefined) => {
    for(let i = 0 ; i < 64; i++){
      const rowOfThree : [number, number, number] = [i, i + 1, i + 2]
      const decidedColor : string = currentColorArrangement[i]
      const notValid = [6, 7, 14,15,22,23,30,31,38,39,46,47,54,55,63,64]

      if(notValid.includes(i)) continue

      if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor)){
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
        return true
      }
    }
  }

  const moveIntoSquareBelow = () : void => {
    for(let i = 0; i <= 55 ; i++){
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)
      
      if(isFirstRow && currentColorArrangement[i] === ""){
        let randomColor = Math.floor(candyColors.length * Math.random())
        currentColorArrangement[i] = candyColors[randomColor]
      }

      if((currentColorArrangement[i + width]) === ""){
        currentColorArrangement[i+width] = currentColorArrangement[i]
        currentColorArrangement[i] = ""
      }
    }
  }

  const dragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setBeingDragged(e.target)
  }
  const dragDrop = (e: React.DragEvent<HTMLImageElement>) => {
    setBeingReplaced(e.target)
  } 
  const dragEnd = () => {
      const squareDraggedId: number = parseInt(beingDragged?.getAttribute("data-id"))
      const squareReplacedId: number = parseInt(beingReplaced?.getAttribute("data-id"))

      currentColorArrangement[squareReplacedId] = beingDragged?.style.backgroundColor
      currentColorArrangement[squareDraggedId] = beingReplaced?.style.backgroundColor

      const validMoves = [
        squareDraggedId - 1,
        squareDraggedId - width,
        squareDraggedId + 1,
        squareDraggedId + width
      ]

      const validMove = validMoves.includes(squareReplacedId)
      
      const isAColOfFour = checkForColOfFour()
      const isAColOfThree = checkForColOfThree()
      const isARowOfFour = checkForRowOfFour()
      const isARowOfFThree = checkForRowOfThree()

      if(squareReplacedId && validMove && (isAColOfFour || isAColOfThree || isARowOfFour || isARowOfFThree)){
        setBeingDragged(null)
        setBeingReplaced(null)
      }else{
        currentColorArrangement[squareReplacedId] = beingReplaced?.style.backgroundColor
        currentColorArrangement[squareDraggedId] = beingDragged?.style.backgroundColor
        setCurrenColorArrangement([...currentColorArrangement])
      }

  }

  const createBoard = () : void => {
    const randomColorArrangement: string[] = []
    for(let i = 0; i < width * width; i++){
      const randomColor : string = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrenColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColOfFour()
      checkForColOfThree()
      checkForRowOfFour()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrenColorArrangement([...currentColorArrangement])
    }, 150)

    return () => clearInterval(timer)
  }, [checkForColOfFour ,checkForColOfThree, checkForRowOfFour,checkForRowOfThree,currentColorArrangement, moveIntoSquareBelow])

  return (
    <div className="flex p-8">
      <div className="w-[560px] h-[560px] flex flex-wrap">
        {currentColorArrangement.map((candyColor: string, index: number) => (
          <img className="w-[70px] h-[70px]" key={index} alt={candyColor} style={{background: candyColor}} data-id={index} draggable={true} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()} onDragLeave={(e) => e.preventDefault()} onDrop={dragDrop} onDragStart={dragStart} onDragEnd={dragEnd} />
        ))}
      </div>
    </div>
  )
}

export default App
