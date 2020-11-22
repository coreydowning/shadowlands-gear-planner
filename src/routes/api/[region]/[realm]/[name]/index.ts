import type { Request } from 'polka'
import type { ServerResponse as Response } from 'http'
import client from '../../../_blizzard/client'

export async function get(req: Request, res: Response, next: () => void) {
    const { region, realm, name } = req.params
    console.log(`~> We got a request to ${region} ${realm} ${name}`)
    const equipment = await client.getCharacterEquipment(region, realm, name)
    res.write(JSON.stringify({
        name,
        region,
        realm,
        characterClass: "Warlock",
        level: 60,
        equipment
    }))
    res.end()
}
