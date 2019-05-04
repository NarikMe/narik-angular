# TypeScript Mixin Pattern Implementation
TS mixin function with autocomplete and without headache.

### About
As far as every TS developer knows, TS doesn't provide any built-in ability for mixins usage.
Sure, they offer ["polyfill"](https://www.typescriptlang.org/docs/handbook/mixins.html), but 
unfortunately this example of mixins implementation is very verbose and it requires a lot of boilerplate code to add that should be maintained.
I'm talking about such construction (from official TS example):

```javascript
class SmartObject implements Disposable, Activatable {
    // implementation details...

    // Disposable                   // Since Disposable and Activatable 
    isDisposed: boolean = false;    // are interfaces you have to
    dispose: () => void;            // keep this ugly implementations
    // Activatable                  // of all of their methods. It becomes 
    isActive: boolean = false;      // an abuse when one of interfaces 
    activate: () => void;           // has changed and you should update
    deactivate: () => void;         // implementation in every "implementers"
}

// and of course you should call special function which does "mixin magic"
applyMixins(SmartObject, [Disposable, Activatable]);
```

Thanks to [falsandtru](https://github.com/falsandtru) I found [his workaround](https://github.com/Microsoft/TypeScript/issues/2919#issuecomment-225398629)
and wrapped it in package to use it in any of your projects until [TS](https://github.com/Microsoft/TypeScript/issues/2919) (or tc39?) came up with 
more suitable solution.

### Usage example

First, install the package `npm install @alizurchik/ts-mixin`

Then, explore the example:

```javascript
import {Mixin} from '@alizurchik/ts-mixin';

// mixins are simple classes
class A {
  static a = 'A';
  ap = 'a';

  am() {
    return this.ap;
  }
}

class B {
  static b = 'B';
  bp = 'b';

  bm() {
    return this.bp;
  }
}

interface AB extends B, A {} // <= You need this to enable typeguards and autocomplete features
class X extends Mixin<AB>(B, A) {
  static x = 'X';
  xp = 'x';

  xm() {
    return this.xp;
  }
}

/* At this moment class X is mixed with classes A and B
   X
   | - a = 'A'
     - b = 'B'
     - x = 'X'
     - prototype (X)
        | - xm()
            | - __proto__
                 | - am()
                 | - bm()
*/

const x = new X();

/*
   x
   | - ap = 'a'
     - bp = 'b'
     - xp = 'x'
     - __ptoto__ = X
*/
```

This way you can simply mix functionality. Few words to add about constructors. Since `Mixin` function uses
`reduce` to walk through it's parameters then classes will be instantiated from the end. Take a look at these 
simple examples:

```javascript
import {Mixin} from '@alizurchik/ts-mixin';

// mixins are simple classes
class A {
  constructor() {
    console.log('A');
  }
}

class B {
  constructor() {
    console.log('B');
  }
}

interface AB extends B, A {}
class XAB extends Mixin<AB>(B, A) {
  constructor() {
    super(); // mandatory! it will trigger each mixed class's constructor
    console.log('X');
  }
}

interface AB extends B, A {}

class XAB extends Mixin<AB>(B, A) /*reverse order*/ { 
  constructor() {
    super(); // mandatory! it will trigger each mixed class's constructor
    console.log('X');
  }
}

class XBA extends Mixin<AB>(A, B) /*direct order*/ {
  constructor() {
    super(); // mandatory! it will trigger each mixed class's constructor
    console.log('X');
  }
}

new XAB();
console.log('---');
new XBA();

/* output =>
A
B
X
---
B
A
X
*/
```

### Known limitation

#### Access to static properties
TypeScript compiler will complain if you try to access static property via dot. Use square brackets instead:

```javascript
X.a; // <= Error: TS2339
X['a']; // Ok
```

But autocomplete feature still works:

![](docs/autocomplete_static_prop.gif)

If someone knows a workaround for this issue PR is highly welcome :exclamation:

#### Mixins + Extending
You can't extend and use mixins at the same time. It means your class could either extend one class
or be mixed with other class(es). Again, if someone knows a workaround, PRs are accepted. 

If you really need it you should use [TS's solution](https://www.typescriptlang.org/docs/handbook/mixins.html).
