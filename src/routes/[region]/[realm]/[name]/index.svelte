<script context="module" lang="ts">
    export async function preload(page, session) {
        const { region, realm, name } = page.params;

        const res = await this.fetch(`api/${region}/${realm}/${name}`);
        const { character, equipment } = await res.json();
        return { character, equipment };
    }
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import type {
        Character,
        CharacterEquipment,
        Equipment,
    } from "../../../api/_blizzard/types";

    export let character: Character;
    export let equipment: CharacterEquipment;
    console.dir(character);
    console.dir(equipment);
    $: mainstatName = "Intellect";
    $: mappedEquipment = equipment.equipped_items.reduce(
        (itemAcc, itemCurr: Equipment) => {
            itemAcc[itemCurr.slot.type] =
                itemCurr.stats?.reduce((statsAcc, statsCurr) => {
                    statsAcc[statsCurr.type.type] = statsCurr.value;
                    return statsAcc;
                }, {}) || {};
            itemAcc[itemCurr.slot.type].name = itemCurr.name;
            itemAcc[itemCurr.slot.type].ilvl = itemCurr.level.value;
            return itemAcc;
        },
        {}
    );
    $: classCss = character.character_class.name
        .toLowerCase()
        .replace(" ", "-");
    onMount(() => {
        console.dir(character);
        console.dir(equipment);
    });
</script>

<style lang="scss">
    @import "../../../../theme/class-colors";
    .death-knight {
        color: $death-knight;
    }
    .demon-hunter {
        color: $demon-hunter;
    }
    .druid {
        color: $druid;
    }
    .hunter {
        color: $hunter;
    }
    .mage {
        color: $mage;
    }
    .monk {
        color: $monk;
    }
    .paladin {
        color: $paladin;
    }
    .priest {
        color: $priest;
    }
    .rogue {
        color: $rogue;
    }
    .shaman {
        color: $shaman;
    }
    .warlock {
        color: $warlock;
    }
    .warrior {
        color: $warrior;
    }
</style>

<svelte:head>
    <title>{character.name} - {character.realm.name}</title>
</svelte:head>

<div>
    <h1 class={classCss}>{character.name} - {character.realm.name}</h1>
    <table>
        <thead>
            <tr>
                <th>Head</th>
                <th>Neck</th>
                <th>Shoulders</th>
                <th>Cloak</th>
                <th>Chest</th>
                <th>Wrist</th>
                <th>Hands</th>
                <th>Waist</th>
                <th>Legs</th>
                <th>Feet</th>
                <th>Finger</th>
                <th>Finger2</th>
                <th>Trinket</th>
                <th>Trinket2</th>
                <th>Main-Hand</th>
                <th>Off-Hand</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    {mappedEquipment['HEAD'] && mappedEquipment['HEAD'].ilvl}
                </td>
                <td>
                    {mappedEquipment['NECK'] && mappedEquipment['NECK'].ilvl}
                </td>
                <td>
                    {mappedEquipment['SHOULDER'] && mappedEquipment['SHOULDER'].ilvl}
                </td>
                <td>
                    {mappedEquipment['BACK'] && mappedEquipment['BACK'].ilvl}
                </td>
                <td>
                    {mappedEquipment['CHEST'] && mappedEquipment['CHEST'].ilvl}
                </td>
                <td>
                    {mappedEquipment['WRIST'] && mappedEquipment['WRIST'].ilvl}
                </td>
                <td>
                    {mappedEquipment['HANDS'] && mappedEquipment['HANDS'].ilvl}
                </td>
                <td>
                    {mappedEquipment['WAIST'] && mappedEquipment['WAIST'].ilvl}
                </td>
                <td>
                    {mappedEquipment['LEGS'] && mappedEquipment['LEGS'].ilvl}
                </td>
                <td>
                    {mappedEquipment['FEET'] && mappedEquipment['FEET'].ilvl}
                </td>
                <td>
                    {mappedEquipment['FINGER_1'] && mappedEquipment['FINGER_1'].ilvl}
                </td>
                <td>
                    {mappedEquipment['FINGER_2'] && mappedEquipment['FINGER_2'].ilvl}
                </td>
                <td>
                    {mappedEquipment['TRINKET_1'] && mappedEquipment['TRINKET_1'].ilvl}
                </td>
                <td>
                    {mappedEquipment['TRINKET_2'] && mappedEquipment['TRINKET_2'].ilvl}
                </td>
                <td>
                    {mappedEquipment['MAIN_HAND'] && mappedEquipment['MAIN_HAND'].ilvl}
                </td>
                <td>
                    {mappedEquipment['OFF_HAND'] && mappedEquipment['OFF_HAND'].ilvl}
                </td>
            </tr>
        </tbody>
    </table>
</div>
