# convention

A rule the codebase follows — naming, patterns, and where things live.

## Operator is extended through two private static fields

**What** — To add an operator to `Operator`, you change exactly three places: the
`static` constant, the `#VALID_OPERATORS` array and the `#OPERATOR_SYMBOLS` map.
`fromSymbol`, `fromValue`, `getAllValues`, `getAllSymbols` and the constructor
validation all derive from those two private fields, so they need no edit.

**Why** — Keeps the set of valid operators a single source of truth and makes the
value object's invariants (validation, immutability, equality by value) impossible
to bypass when the domain grows. Symbols must stay unique: `fromSymbol` resolves by
reverse lookup over `#OPERATOR_SYMBOLS` and would silently pick the first match.

**Where** — `src/domain/value-objects/Operator.js`

**Learned** — 2026-09-02, adding POWER/SQUARE_ROOT/PERCENTAGE/SIN/COS/TAN/LOG.
