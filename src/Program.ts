import { pipe } from "@fp-ts/data/Function"
import * as Z from "@effect/io/Effect"
import * as Schedule from "@effect/io/Schedule"

import * as readline from 'node:readline/promises'
import { Name } from "./models/Name";
import { Readline } from "./effects/Readline";

export const askQuestion = (rl: readline.Interface, message: string) =>
  Z.tryCatchPromise(
    () => rl.question(message),
    () => "askQuestion err" as const
  )

export const printAnswer = (answer: string) =>
  Z.sync(() => console.log(`Thank you for your valuable feedback: ${answer}`))

const getName: Z.Effect<Readline, unknown, Name> =
  pipe(
    Z.service(Readline),
    Z.flatMap((rl) => rl.getUserInput("What's your name? ")),
    Z.flatMap((input) => 
      pipe(
        Z.fromOption(Name.make(input)),
        Z.tapError((_) => Z.succeed(console.log("Invalid name. Please try again...")))
      )
    ),
    Z.retry(Schedule.recurs(2))
  )
  
export const readlineProgram = () =>
  pipe(
    getName,
    Z.flatMap((name) => Z.sync(() => console.log(name.name))),
    Z.catchAll((_) => Z.succeed(console.log("Sorry. Ran out of tries to enter name.")))
  )
  