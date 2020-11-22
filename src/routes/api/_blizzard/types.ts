
interface Href {
    href: string
}
interface KeyedType {
    id: number
    key: Href
    name: string
    slug?: string
    display_string?: string
}
interface Character {
    active_spec: KeyedType
    active_title: KeyedType
    character_class: KeyedType
    equipped_item_level: number
    level: number
    name: string
    race: KeyedType
    realm: KeyedType
}

interface NamedType {
    type: string
    name: string
}

interface ItemLevel {
    value: number
}

interface ItemStat {
    type: NamedType
    value: number
    is_negated?: boolean
}
interface Equipment {
    inventory_type: NamedType
    slot: NamedType
    level: ItemLevel
    name: string
    stats?: ItemStat[]
}
interface CharacterEquipment {
    equipped_items: Equipment[]
}

export type { Href, KeyedType, Character, NamedType, ItemLevel, Equipment, CharacterEquipment }