import * as Option from "@fp-ts/data/Option"
import { isLetter } from "./Letter"
import { Word } from "./Word"

export interface Won {
  readonly _tag: "Won"
}

export interface Lost {
  readonly _tag: "Lost"
}

export interface Correct {
  readonly _tag: "Correct"
}

export interface Incorrect {
  readonly _tag: "Incorrect"
}

export interface Unchanged {
  readonly _tag: "Unchanged"
}

export type GuessResult =
  | Won
  | Lost
  | Correct
  | Incorrect
  | Unchanged