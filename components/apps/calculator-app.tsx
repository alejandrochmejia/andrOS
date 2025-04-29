"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CalculatorApp() {
  const [display, setDisplay] = useState<string>("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clearDisplay = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    if (firstOperand === null || operator === null) return Number.parseFloat(display)

    const secondOperand = Number.parseFloat(display)
    let result = 0

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand
        break
      case "-":
        result = firstOperand - secondOperand
        break
      case "*":
        result = firstOperand * secondOperand
        break
      case "/":
        result = firstOperand / secondOperand
        break
      default:
        return secondOperand
    }

    return result
  }

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return

    const result = performCalculation()
    setDisplay(String(result))
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0")
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handlePlusMinus = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(-value))
  }

  const handlePercentage = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-900 p-4 text-gray-200">
      <div className="w-full max-w-xs rounded-lg bg-gray-800 p-4 shadow-lg">
        <div className="mb-4 flex h-16 items-center justify-end rounded-md bg-gray-900 px-4">
          <div className="text-right text-3xl font-light">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="h-12 bg-gray-700 hover:bg-gray-600" onClick={clearDisplay}>
            C
          </Button>
          <Button variant="outline" className="h-12 bg-gray-700 hover:bg-gray-600" onClick={handlePlusMinus}>
            +/-
          </Button>
          <Button variant="outline" className="h-12 bg-gray-700 hover:bg-gray-600" onClick={handlePercentage}>
            %
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => handleOperator("/")}
          >
            ÷
          </Button>

          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("7")}>
            7
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("8")}>
            8
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("9")}>
            9
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => handleOperator("*")}
          >
            ×
          </Button>

          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("4")}>
            4
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("5")}>
            5
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("6")}>
            6
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => handleOperator("-")}
          >
            -
          </Button>

          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("1")}>
            1
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("2")}>
            2
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("3")}>
            3
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => handleOperator("+")}
          >
            +
          </Button>

          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={handleBackspace}>
            ←
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={() => inputDigit("0")}>
            0
          </Button>
          <Button variant="outline" className="h-12 bg-gray-800 hover:bg-gray-700" onClick={inputDecimal}>
            .
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-orange-500 text-white hover:bg-orange-600"
            onClick={handleEquals}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  )
}
