# contradiction

A memory that clashes with newer reality — flagged to be resolved.

## A prior project memory recorded "arity is unmodeled in the domain" as an open gotcha (Cal…

What: A prior project memory recorded "arity is unmodeled in the domain" as an open gotcha (Calculation/CalculatorService hard-wired to binary ops despite unary SQUARE_ROOT/SIN/COS/TAN/LOG and ambiguous PERCENTAGE). · Why: this work order resolves it only at the service layer (switch-level unary handling, PERCENTAGE defined as a/100) while deliberately leaving Operator.js and Calculation.js untouched. · How to apply: treat the domain-level arity question as still open — re-evaluate if a future caller needs to know an operator's arity directly instead of always passing rightOperand=0. <!-- id: eb9294e6-5120-4763-ac0e-47e126808640-7 -->
