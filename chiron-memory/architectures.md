# architecture

How the system is put together — layers, boundaries, and how data flows.

## PerformCalculation (application use case) and the UI already forward all three arguments…

What: PerformCalculation (application use case) and the UI already forward all three arguments (left, operator, right) unchanged to CalculatorService, so single-operand scientific operations work as soon as callers pass 0 for rightOperand — no use-case code changes were required. · Why: — · Where: src/application/use-cases/PerformCalculation.js. · Learned: actually wiring single-operand entry into the UI (so users don't have to fake a rightOperand) is left as a separate/future work order. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-6 -->

## `DIContainer` and `UIManager` are exported from `src/interfaces/web/index.js` (bootstrap…

What: `DIContainer` and `UIManager` are exported from `src/interfaces/web/index.js` (bootstrap logic itself unchanged) so UI wiring is unit-testable. · Why: Enables jsdom-based tests to instantiate the real UI wiring instead of re-implementing/mocking it, without changing how the app actually boots in the browser. · Where: src/interfaces/web/index.js · Learned: Future web-layer tests should import these exports rather than duplicating DI/wiring logic in test files. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-6 -->
