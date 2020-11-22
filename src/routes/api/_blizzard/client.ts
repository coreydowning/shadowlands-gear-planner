import axios, { AxiosInstance } from 'axios'
import FormData from 'form-data'
import { add, isBefore } from 'date-fns'
import { access } from 'fs'


class Client {
    clientId: string
    clientSecret: string
    tokenExpiresAt: Date
    client: AxiosInstance

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    hasValidCredentials(): boolean {
        return !!this.client && isBefore(new Date(), this.tokenExpiresAt)
    }

    async getCredentials(): Promise<void> {
        const form = new FormData()
        form.append('grant_type', 'client_credentials')

        const response = await axios.post('https://us.battle.net/oauth/token', form, { headers: form.getHeaders(), auth: { username: this.clientId, password: this.clientSecret } })
        const { access_token, expires_in } = response.data
        this.tokenExpiresAt = add(new Date(), { seconds: expires_in })
        this.client = axios.create({
            headers: { 'Authorization': `Bearer ${access_token}` },
            params: {
                namespace: 'profile-us',
                locale: 'en_US',
            }
        })
    }

    async getCharacterEquipment(region: string, realm: string, name: string): Promise<any> {
        if (!this.hasValidCredentials()) {
            await this.getCredentials()
        }
        const response = await this.client.get(`https://${region}.api.blizzard.com/profile/wow/character/${realm}/${name}/equipment`)
        return response.data
    }
}

export default Client