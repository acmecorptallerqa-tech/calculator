# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The 7 new scientific operators (POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) were…

What: The 7 new scientific operators (POWER, SQUARE_ROOT, PERCENTAGE, SIN, COS, TAN, LOG) were added only to the `Operator` value object; `CalculatorService.calculate`'s switch statement was deliberately left untouched and still throws "Unsupported operator" for all of them. · Why: this work order scoped only the domain value object (foundation layer); implementing the actual calculation logic is explicitly a separate, later work order. · Where: src/domain/value-objects/Operator.js, src/domain/services/CalculatorService.js · Learned: don't expand scope to implement service-layer behavior when the work order only asks for the domain constant/validation layer. <!-- id: 387c5d83-37a7-440a-aefa-dcac89c49e76-2 -->
