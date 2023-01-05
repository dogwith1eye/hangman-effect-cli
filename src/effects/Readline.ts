import { pipe } from "@fp-ts/data/Function"
import * as Context from "@fp-ts/data/Context";
import * as Z from "@effect/io/Effect"
import * as Scope from "@effect/io/Scope";
import * as Schedule from "@effect/io/Schedule"

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export interface ReadlineInterface {
  readonly rl: readline.Interface;
}

export const ReadlineInterface = Context.Tag<ReadlineInterface>();

export const resource: Z.Effect<Scope.Scope, never, ReadlineInterface> =
  Z.acquireRelease(
    pipe(
      Z.sync(() => readline.createInterface({ input, output })),
      Z.map((rl) => ({ rl })),
      Z.tap(() => Z.logInfo("ReadlineInterface acquired"))
    ),
    ({ rl }) =>
      pipe(
        Z.sync(() => rl.close()),
        Z.tap(() => Z.logInfo("ReadlineInterface released"))
      )
  )

// export interface Readline {
//   readonly getUserInput: (message:string) => string
// }

// export const Readline = Context.Tag<Readline>();