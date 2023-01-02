import { Guess } from "./Guess";
import { Name } from "./Name";
import { Word } from "./Word";

export class State {
  static initial = (name: Name, word: Word): State =>
    new State(name, new Set<Guess>, word)

  private constructor(readonly name: Name, readonly guesses: Set<Guess>, readonly word: Word) { }

  failuresCount(this: State): number {
    return new Set([...this.guesses].filter(x => !this.word.toSet().has(x.guess))).size;
  }

  playerLost(this: State): boolean {
    return this.failuresCount() > 5
  }

  playerWon(this: State): boolean {
    const charguesses = new Set([...this.guesses].map(x => x.guess))
    return new Set([...this.word.toSet()].filter(x => !charguesses.has(x))).size == 0;
  }

  addGuess(this: State, guess: Guess): State {
    return new State(this.name, this.guesses.add(guess), this.word)
  }
}