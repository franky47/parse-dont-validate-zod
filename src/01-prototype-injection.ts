import { z } from 'zod'

const json = `
{
  "name": "Evil",
  "__proto__": {
    "admin": true
  }
}
`

const unsafe = Object.assign({}, JSON.parse(json))
console.dir(unsafe)
console.log(unsafe.name)
console.log(unsafe.admin)

const schema = z.object({
  name: z.string(),
  admin: z.boolean().optional().default(false),
})

const safe = Object.assign(schema.parse(JSON.parse(json)))
console.dir(safe)
console.log(safe.name)
console.log(safe.admin)
