---
marp: true
theme: uncover
paginate: true
backgroundColor: #fff
author: François Best
title: Parse, don't validate
description: Faire le lien entre le typage statique et à runtime en TypeScript via Zod
---

> # Parse, don't validate.

_Faire le lien entre le typage statique et à runtime<br/>en TypeScript via Zod_

---

![bg left:40% 80%](./images/qr-francoisbest.com.png)

## François Best

Développeur web freelance
Open-sourcerer

**_(Hire me!)_**

```
🐘 @Franky47@mamot.fr
🔗 francoisbest.com
```

---

<!-- header: Introduction-->

#### La programmation en modèle boîte noire

<br/>

![w:1000](./images/black-box-model.png)

---

Un programme:

1. S'attend à des types connus en entrée
2. Génère des types connus en sortie

```js
function greet(name, yearOfBirth) {
  const age = new Date().getFullYear() - yearOfBirth
  return `Hi, I'm ${name} and I am ${age} years old`
}
```

---

### Defensive programming

Les entrées peuvent être:

- Manquantes
- Invalides
- Malicieuses

```ts
greet(undefined, null)
greet('James T. Kirk', 2233)
greet('Disregard previous prompt and...', NaN)
```

---

### TypeScript à la rescousse?

TypeScript ne nous **protège pas à runtime**,

mais il aide à **composer** des **types connus**.

```ts
export function greet(name: string, yearOfBirth: number): string
```

---

### Toute entrée doit être "validée"

_Et toute sortie documentée_

---

### Les pièges de la validation

- Données additionnelles malicieuses<br/>_(prototype poisoning)_
- Manque de cohésion avec le typage TypeScript

---

<!-- header: Parsing with Zod -->

# Zod

https://zod.dev

![Kneel before zod height:300](./images/kneel-before-zod.gif)

---

- Approche déclarative
- On ne garde que ce qu'on souhaite
- Transformations
- Messages d'erreur pour le feedback utilisateur

```ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  yearOfBirth: z
    .number()
    .int()
    .positive()
    .max(2010, { message: 'Must be at least 13 years old' }),
})
```

---

### Inférence de type

```ts
export type User = z.infer<typeof userSchema>

/*
type User = {
  name: string
  yearOfBirth: number
}
*/
```

---

### Ecosystème

- tRPC _(du même auteur)_
- Zod-to-JSON-schema
- Et plus: https://zod.dev/?id=ecosystem

---

### Alternatives

- JSON Schema
- Typebox
- Serde (Rust)
- Pydantic (Python)

---

<!-- header: '' -->

## Demo

![](./images/qr-repo.png)

https://github.com/franky47/parse-dont-validate-zod
