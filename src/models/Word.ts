import * as Option from "@fp-ts/data/Option"
import { isLetter } from "./Letter"

export class Word {
  static make = (word: string) =>
    word.length > 0 && word.split('').every(x => isLetter(x))
      ? Option.some(new Word(word.toLowerCase()))
      : Option.none

  private constructor(readonly word: string) { }

  get length(): number {
    return this.word.length;
  }

  includes(this: Word, char: string) {
    return this.word.includes(char)
  }

  toList(this: Word) {
    return this.word.split('')
  }

  toSet(this: Word) {
    return new Set<string>(this.toList())
  }
}