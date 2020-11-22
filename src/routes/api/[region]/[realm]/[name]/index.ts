import type { Request } from 'polka'
import type { ServerResponse as Response } from 'http'
import client from '../../../_blizzard/client'

export async function get(req: Request, res: Response, next: () => void) {
    const { region, realm, name } = req.params
    console.log(`~> We got a request to ${region} ${realm} ${name}`)
    const characterPromise = client.getCharacter(region, realm, name)
    const equipmentPromise = client.getCharacterEquipment(region, realm, name)
    const [character, equipment] = await Promise.all([characterPromise, equipmentPromise])
    res.write(JSON.stringify({
        equipment,
        character,
    }))
    res.end()
}
