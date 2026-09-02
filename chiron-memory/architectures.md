# architecture

How the system is put together — layers, boundaries, and how data flows.

## Unary scientific operators (√, %, sin, cos, tan, log) must be triggered by calling contro…

What: Unary scientific operators (√, %, sin, cos, tan, log) must be triggered by calling controller.calculate(currentInput, symbol, '0'), passing the literal string '0' as the right operand · Why: this is the input contract CalculatorService.calculate expects for unary operations, per a previously recorded domain decision · Where: src/domain/services/CalculatorService.js, src/interfaces/web/index.js · Learned: don't omit or invent a different placeholder for the second operand on unary ops — it must be '0'. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-0 -->

## CalculatorService already implements scientific operation calculation logic (power, sqrt,…

What: CalculatorService already implements scientific operation calculation logic (power, sqrt, percentage, sin, cos, tan, log) as of commit bb7d04e, prior to any UI wiring work · Why: — · Where: src/domain/services/CalculatorService.js · Learned: adding scientific calculator buttons is presentation-layer-only work; the domain/service support for scientific operations is already in place and shouldn't be re-implemented. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-6 -->

## Operator value object exposes a static factory method fromSymbol(symbol) that reconstruct…

What: Operator value object exposes a static factory method fromSymbol(symbol) that reconstructs an Operator instance from its display symbol (e.g. '^', '√', 'sin') · Why: lets the presentation layer query domain classifications like isUnary() from a raw symbol string (e.g. a button's data-operator attribute) without re-deriving or duplicating the operator-symbol table in the UI layer · Where: src/domain/value-objects/Operator.js, src/interfaces/web/index.js · Learned: when UI code needs to classify an operator by its symbol, convert via Operator.fromSymbol() rather than adding a second symbol-to-classification map in the interface layer. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-7 -->
