import type { Request } from 'polka'
import type { ServerResponse as Response } from 'http'

export async function get(req: Request, res: Response, next: () => void) {
    const { region, realm, name } = req.params
    console.log(`~> We got a request to ${region} ${realm} ${name}`)
    res.write(JSON.stringify({
        name,
        region,
        realm,
        characterClass: "Warlock",
        level: 60,
    }))
    res.end()
}
