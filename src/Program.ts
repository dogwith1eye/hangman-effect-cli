import { pipe } from "@fp-ts/data/Function"
import * as Context from "@fp-ts/data/Context";
import * as Z from "@effect/io/Effect"
import * as Scope from "@effect/io/Scope";
import * as Schedule from "@effect/io/Schedule"

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { promisify } from "node:util";
import { Name } from "./models/Name";
import { ReadlineInterface, resource } from "./effects/Readline";

export const askQuestion = (rl: readline.Interface, message: string) =>
  Z.tryCatchPromise(
    () => rl.question(message),
    () => "askQuestion err" as const
  )

export const printAnswer = (answer: string) =>
  Z.sync(() => console.log(`Thank you for your valuable feedback: ${answer}`))

const getName =
  pipe(
    Z.service(ReadlineInterface),
    Z.flatMap((_) => askQuestion(_.rl, "What's your name? ")),
    Z.flatMap((input) => 
      pipe(
        Z.fromOption(Name.make(input)),
        Z.tapError((_) => Z.succeed(console.log("Invalid input. Please try again...")))
      )
    )
  )
  
export const readlineProgram = () =>
  pipe(
    getName,
    Z.retry(Schedule.once()),
  )
  