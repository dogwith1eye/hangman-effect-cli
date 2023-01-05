#!/usr/bin/env node

const { program } = require('commander')

import * as Z from "@effect/io/Effect"

import { readlineProgram } from './Program'

program
  .version('0.1.0')
  .parse(process.argv)

const options = program.opts()

Z.unsafeRunPromise(readlineProgram())