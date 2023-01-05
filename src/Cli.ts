#!/usr/bin/env node

const { program } = require('commander')

import { pipe } from "@fp-ts/data/Function";
import * as Z from "@effect/io/Effect";
import * as ZL from "@effect/io/Layer";
import * as Scope from "@effect/io/Scope";
import * as Exit from "@effect/io/Exit";

import { ReadlineLayer } from './effects/Readline'
import { readlineProgram } from './Program'

program
  .version('0.1.0')
  .parse(process.argv)

const options = program.opts()

const makeAppRuntime = <R, E, A>(layer: ZL.Layer<R, E, A>) =>
  Z.gen(function* ($) {
    const scope = yield* $(Scope.make())
    const env = yield* $(ZL.buildWithScope(scope)(layer))
    const runtime = yield* $(pipe(Z.runtime<A>(), Z.provideEnvironment(env)))

    return {
      runtime,
      close: Scope.close(Exit.unit())(scope),
    }
  })

const promise = Z.unsafeRunPromise(makeAppRuntime(ReadlineLayer));
promise.then(({ runtime, close }) => {
  process.on("beforeExit", () => Z.unsafeRunPromise(close));
  runtime.unsafeRunPromise(readlineProgram());
})