# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%`…

What: The scientific operator symbols added to Operator are `^` (POWER), `√` (SQUARE_ROOT), `%` (PERCENTAGE), and the literal text `sin`/`cos`/`tan`/`log` for the trig/log operators, alongside the existing `+ - × ÷`. · Why: — · Where: src/domain/value-objects/Operator.js. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-1 -->

## LOG operator computes the natural logarithm via Math.log, not log10/log2.

What: LOG operator computes the natural logarithm via Math.log, not log10/log2. · Why: acceptance criterion requires log(Math.E) === 1. · Where: src/domain/services/CalculatorService.js (#log). <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-2 -->

## Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees.

What: Trigonometric operators (SIN, COS, TAN) assume the operand is in radians, not degrees. · Why: — · Where: src/domain/services/CalculatorService.js. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-3 -->

## POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scient…

What: POWER stays binary (Math.pow(leftOperand, rightOperand)), unlike the six other new scientific operators (SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) which are unary and ignore rightOperand. · Why: exponentiation genuinely needs base and exponent, so it fits the pre-existing binary switch/private-method pattern with no special-casing. · Where: CalculatorService.js #power. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-8 -->

## Operator arity (unary vs binary) should be exposed via an isUnary() instance method added…

What: Operator arity (unary vs binary) should be exposed via an isUnary() instance method added to the Operator value object, not via a hardcoded list of unary symbols in the UI layer · Why: hardcoding the unary list in HTML classes or in UIManager would leak a domain rule into the presentation layer, which this project's Clean Architecture conventions forbid; a prior recorded decision explicitly deferred adding isUnary() until the UI actually needed to know arity · Where: src/domain/value-objects/Operator.js · Learned: when the presentation layer needs a domain classification, add the accessor to the domain value object instead of duplicating the rule elsewhere. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-1 -->

## A shared private #applyResult(result) method is being extracted in UIManager so both the…

What: A shared private #applyResult(result) method is being extracted in UIManager so both the new unary-operator path and the existing binary/equals path apply calculation results through identical logic · Why: keeps success/error handling, including the 2-second error-message auto-reset, consistent across both calculation paths instead of duplicating it · Where: src/interfaces/web/index.js · Learned: when adding a new calculation trigger path to UIManager, route it through #applyResult() rather than reimplementing result/error display. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-10 -->
