#!/usr/bin/env node

const { program } = require('commander');
import { orderPizza } from './program'

import * as Z from "@effect/io/Effect";
import { orderPizzaEff } from './program'

program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese', 'marble')
  .parse(process.argv)

const options = program.opts();
const toppings = {
  peppers: options.peppers,
  pineapple: options.pineapple,
  bbqSauce: options.bbqSauce,
  cheeseType: options.cheese
}

orderPizza(toppings).then(result => console.log(result.message))

Z.unsafeRunPromise(orderPizzaEff(toppings)).then(result => console.log(result.message));