# contradiction

A memory that clashes with newer reality — flagged to be resolved.

## RESOLVED — the UI does need Operator to know its own arity; `isUnary()` landed and is us…

What: RESOLVED. The open contradiction ('does the UI need Operator to know its own arity?') is closed: `Operator.isUnary()` landed, backed by a private static `#UNARY_OPERATORS` list, and `UIManager` dispatches every `[data-operator]` click through it to choose the binary or unary flow. · Why: the scientific-buttons work order was the first caller that genuinely needed arity; encoding the unary list in markup classes or in the UI would have put a domain rule in the presentation layer. · Where: src/domain/value-objects/Operator.js, src/interfaces/web/index.js · Learned: arity is now readable from the domain — ask the `Operator`, never re-derive it from a symbol list at a call site. Still open, and narrower: `Calculation` remains binary, so a unary calculation is stored and rendered in the history as `16 √ 0 = 4`; revisit only if history readability becomes a requirement. <!-- id: ae8012c2-664a-4080-b08d-85c49d788242-2 -->
