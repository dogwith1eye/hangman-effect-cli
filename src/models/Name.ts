import * as Option from "@fp-ts/data/Option"

export class Name {
  static make = (name: string) =>
    (name.length > 0) ? Option.some(new Name(name)) : Option.none

  private constructor(readonly name: string) { }
}