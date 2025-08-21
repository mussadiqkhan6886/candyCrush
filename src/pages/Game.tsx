import { useEffect, useState } from "react"
import blue from "../images/blue-candy.png"
import green from "../images/green-candy.png"
import orange from "../images/orange-candy.png"
import purple from "../images/purple-candy.png"
import red from "../images/red-candy.png"
import yellow from "../images/yellow-candy.png"
import blank from "../images/blank.png"
import awesome from "../images/awesome.png"
import bravo from "../images/bravo.png"
import sorry from "../images/sorry.png"
import Restart from "../components/Restart"
import Score from "../components/Score"

const width: number = 8

const candyColors: string[] = [
  blue,
  green,
  orange,
  purple,
  red,
  yellow,
]

const Game = () => {
  const [currentColorArrangement, setCurrenColorArrangement] = useState<string[]>([])
  const [beingDragged, setBeingDragged] = useState<HTMLImageElement | null>(null)
  const [beingReplaced, setBeingReplaced] = useState<HTMLImageElement | null>(null)
  const [showBravo, setShowBravo] = useState<boolean>(false)
  const [showAwesome, setShowAwesome] = useState<boolean>(false)
  const [showSorry, setShowSorry] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  // ---- CHECK FUNCTIONS ----
  const checkForColOfFour = (board: string[]): boolean => {
    for (let i = 0; i <= 39; i++) {
      const colOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = board[i]
      const isBlank = currentColorArrangement[i] == blank
      if (decidedColor && colOfFour.every(square => board[square] === decidedColor && !isBlank)) {
        colOfFour.forEach(square => board[square] = blank)
        setShowBravo(true)
        setScore(score => score + 4)
        return true
      }
    }
    return false
  }

  const checkForColOfThree = (board: string[]): boolean => {
    for (let i = 0; i <= 47; i++) {
      const colOfThree = [i, i + width, i + width * 2]
      const decidedColor = board[i]
      const isBlank = currentColorArrangement[i] == blank
      if (decidedColor && colOfThree.every(square => board[square] === decidedColor && !isBlank)) {
        colOfThree.forEach(square => board[square] = blank)
        setScore(score => score + 3)
        setShowAwesome(true)
        return true
      }
    }
    return false
  }

  const checkForRowOfFour = (board: string[]): boolean => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = board[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23,
        29, 30, 31, 37, 38, 39, 45, 46, 47,
        53, 54, 55, 62, 63, 64]
      if (notValid.includes(i)) continue
      const isBlank = currentColorArrangement[i] == blank
      if (decidedColor && rowOfFour.every(square => board[square] === decidedColor && !isBlank)) {
        rowOfFour.forEach(square => board[square] = blank)
        setShowBravo(true)
        setScore(score => score + 4)
        return true
        
      }
    }
    return false
  }

  const checkForRowOfThree = (board: string[]): boolean => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = board[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31,
        38, 39, 46, 47, 54, 55, 63, 64]
      if (notValid.includes(i)) continue
      const isBlank = currentColorArrangement[i] == blank
      if (decidedColor && rowOfThree.every(square => board[square] === decidedColor && !isBlank)) {
        rowOfThree.forEach(square => board[square] = blank)
        setShowAwesome(true)
        setScore(score => score + 3)
        return true
      }
    }
    return false
  }

  // ---- FALLING LOGIC ----
  const moveIntoSquareBelow = (board: string[]): string[] => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && board[i] === blank) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        board[i] = candyColors[randomColor]
      }

      if (board[i + width] === blank) {
        board[i + width] = board[i]
        board[i] = blank
      }
    }
    return board
  }

  // ---- DRAG LOGIC ----
  const dragStart = (e: React.DragEvent<HTMLImageElement>) => {
    setBeingDragged(e.target as HTMLImageElement)
     const img = e.target as HTMLImageElement
     e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2)
  }

  const dragDrop = (e: React.DragEvent<HTMLImageElement>) => {
    setBeingReplaced(e.currentTarget)
  }

  const dragEnd = () => {
    if (!beingDragged || !beingReplaced) return

    const squareDraggedId = parseInt(beingDragged.getAttribute("data-id")!)
    const squareReplacedId = parseInt(beingReplaced.getAttribute("data-id")!)

    if (isNaN(squareDraggedId) || isNaN(squareReplacedId)) return

    const newArrangement = [...currentColorArrangement]

    newArrangement[squareReplacedId] = beingDragged.getAttribute("src")!
    newArrangement[squareDraggedId] = beingReplaced.getAttribute("src")!

    const validMoves = [
      squareDraggedId - 1,
      squareDraggedId - width,
      squareDraggedId + 1,
      squareDraggedId + width,
    ]
    const validMove = validMoves.includes(squareReplacedId)

    const checkBoard = [...newArrangement]
    const isAColOfFour = checkForColOfFour(checkBoard)
    const isAColOfThree = checkForColOfThree(checkBoard)
    const isARowOfFour = checkForRowOfFour(checkBoard)
    const isARowOfThree = checkForRowOfThree(checkBoard)

    if (
      squareReplacedId >= 0 &&
      validMove &&
      (isAColOfFour || isAColOfThree || isARowOfFour || isARowOfThree)
    ) {
      setCurrenColorArrangement(newArrangement)
    } else {
      setCurrenColorArrangement([...currentColorArrangement]) // revert
      setShowSorry(true)
    }

    setBeingDragged(null)
    setBeingReplaced(null)
  }

  // ---- INITIAL BOARD ----
  const createBoard = (): void => {
    const randomColorArrangement: string[] = []
    for (let i = 0; i < width * width; i++) {
      const randomColor: string = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrenColorArrangement(randomColorArrangement)
  }

  // ---- EFFECTS ----
  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const board = [...currentColorArrangement]
      checkForColOfFour(board)
      checkForColOfThree(board)
      checkForRowOfFour(board)
      checkForRowOfThree(board)
      moveIntoSquareBelow(board)
      setCurrenColorArrangement([...board])
    }, 150)

    return () => clearInterval(timer)
  }, [currentColorArrangement])

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowAwesome(false)
        setShowBravo(false)
        setShowSorry(false)
    }, 1900)

    return () => clearTimeout(timer)
  }, [showBravo, showAwesome, showSorry])

  const reset = () => {
    createBoard()
  }

  // ---- RENDER ----
  return (
    <div className="flex flex-col items-center justify-center min-h-screen game">
     <Score score={score} />
     <Restart func={reset} />
     <h1 className="text-6xl font-extrabold mb-8 animate-bounce text-center">
    <span className="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
      Candy
    </span>
    {" "}
    <span className="candy-crush-text drop-shadow-xl">
      Crush
    </span>
    {" "}
    <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
      Clone
    </span>
    </h1>
      {showBravo && <img className="w-[500px] absolute z-10000 animation" src={bravo} alt="bravo" />}
      {showAwesome && <img className="w-[400px] absolute z-1000 animation" src={awesome} alt="awesome" />}
      {showSorry && <img className="w-[500px] absolute z-10000 animation" src={sorry} alt="sorry" />}
      <div className="grid grid-cols-8 gap-1 bg-white/30 p-3 rounded-2xl shadow-2xl backdrop-blur">
        {currentColorArrangement.map((candy, index) => (
          <img
            key={index}
            src={candy}
            alt="candy"
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
            className="w-14 cursor-grab h-14 rounded-xl shadow-md transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
          />
        ))}
      </div>
    </div>
  )
}

export default Game
