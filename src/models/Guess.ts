import * as Option from "@fp-ts/data/Option"
import { isLetter } from "./Letter"
import { Word } from "./Word"

export class Guess {
  static make = (guess: string) =>
    isLetter(guess) ? Option.some(new Guess(guess.toLowerCase())) : Option.none

  private constructor(readonly guess: string) { }
}