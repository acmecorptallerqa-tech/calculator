# gotcha

A non-obvious pitfall or trap, learned the hard way.

## `Operator.fromSymbol` resolves a symbol via a linear `find` over `#OPERATOR_SYMBOLS`, so…

What: `Operator.fromSymbol` resolves a symbol via a linear `find` over `#OPERATOR_SYMBOLS`, so every symbol in that map must be globally unique across all operators (arithmetic and scientific). · Why: a duplicate symbol would silently resolve to the wrong operator with no validation error. · Where: src/domain/value-objects/Operator.js · Learned: when adding an operator, explicitly verify its symbol doesn't collide with any existing one (verified uniqueness for all 11: +,-,×,÷,^,√,%,sin,cos,tan,log). <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## Arity is unmodeled in the domain — `Calculation` entity and `CalculatorService.calculate`…

What: Arity is unmodeled in the domain — `Calculation` entity and `CalculatorService.calculate` are hard-wired to binary operations (`left, operator, right`), but SQUARE_ROOT, SIN, COS, TAN, LOG are unary, and PERCENTAGE is ambiguous between unary (`a/100`) and binary ("a% of b"). · Why: the Operator value object as specified has no `isUnary()`/arity concept, so this can't be resolved at this layer. · Where: src/domain/value-objects/Operator.js, src/domain/entities/Calculation.js, src/domain/services/CalculatorService.js · Learned: the next work order that implements scientific calculation logic must first decide how arity (and PERCENTAGE's semantics) is expressed in the domain model. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-3 -->

## `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote…

What: `Math.tan(Math.PI/2)` returns 1.633e16, not `Infinity`, so the tangent asymptote cannot be detected by testing the result for non-finiteness. `CalculatorService.#tan` instead throws when `Math.abs(Math.cos(a)) < 1e-10` (the private static `#TAN_ASYMPTOTE_TOLERANCE`). · Why: `Math.PI/2` is not exactly representable as a double, so the cosine there is about 6.1e-17 rather than 0 and the tangent stays finite but meaninglessly large. · Where: src/domain/services/CalculatorService.js · Learned: detect trig asymptotes through the cosine with an explicit tolerance; any tolerance between roughly 1e-15 and 1e-10 works, and 1e-10 was chosen because a tangent above 1e10 is already unusable. <!-- id: 85d96f8a-dcf7-4e00-84f3-951f164796c3-1 -->
