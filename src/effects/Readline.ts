import { pipe } from "@fp-ts/data/Function"
import * as Context from "@fp-ts/data/Context";
import * as Z from "@effect/io/Effect"
import * as ZL from "@effect/io/Layer";
import * as Scope from "@effect/io/Scope";

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export interface Readline {
  readonly getUserInput: (message:string) => Z.Effect<never, "getUserInput err", string>
}

export const Readline = Context.Tag<Readline>();

export const resource: Z.Effect<Scope.Scope, never, Readline> =
  Z.acquireRelease(
    pipe(
      Z.sync(() => readline.createInterface({ input, output })),
      Z.map((rl) => (new ReadlineNode(rl))),
      Z.tap(() => Z.logInfo("ReadlineInterface acquired"))
    ),
    ({ rl }) =>
      pipe(
        Z.sync(() => rl.close()),
        Z.tap(() => Z.logInfo("ReadlineInterface released"))
      )
  )

class ReadlineNode implements Readline {
  constructor(readonly rl: readline.Interface) {}

  getUserInput = (message: string): Z.Effect<never, "getUserInput err", string> =>
    Z.tryCatchPromise(
      () => this.rl.question(message),
      () => "getUserInput err" as const
    )
}

export const ReadlineLayer: ZL.Layer<never, never, Readline> =
  ZL.scoped(Readline)(resource);