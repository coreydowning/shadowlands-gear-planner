<script context="module" lang="ts">
    export async function preload(page, session) {
        const { region, realm, name } = page.params;

        const res = await this.fetch(`api/${region}/${realm}/${name}`);
        const wowCharacter = await res.json();
        return { wowCharacter };
    }
</script>

<script lang="ts">
    import { Headline } from "attractions";
    import { onMount } from "svelte";

    export let wowCharacter;
    console.dir(wowCharacter);
    $: mainstatName = "Intellect";
    $: equipment = wowCharacter?.equipment?.equipped_items?.reduce(
        (itemAcc, itemCurr) => {
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
    onMount(() => {
        console.dir(wowCharacter);
    });
</script>

<style lang="scss">
</style>

<svelte:head>
    <title>
        {wowCharacter.name}
        -
        {wowCharacter.realm}
        ({wowCharacter.region})
    </title>
</svelte:head>

<div>
    <Headline>
        {wowCharacter.name}
        -
        {wowCharacter.realm}
        ({wowCharacter.region})
    </Headline>
    <table>
        <thead>
            <tr>
                <th>Slot</th>
                <th>Item</th>
                <th>ilvl</th>
                <th>{mainstatName}</th>
                <th>Stamina</th>
                <th>Critical Strike</th>
                <th>Haste</th>
                <th>Versatility</th>
                <th>Mastery</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.keys(equipment) as slot}
                <tr>
                    <td>{slot}</td>
                    <td>{equipment[slot].name}</td>
                    <td>{equipment[slot].ilvl}</td>
                    <td>{equipment[slot].INTELLECT || '--'}</td>
                    <td>{equipment[slot].STAMINA || '--'}</td>
                    <td>{equipment[slot].CRIT_RATING || '--'}</td>
                    <td>{equipment[slot].HASTE_RATING || '--'}</td>
                    <td>{equipment[slot].VERSATILITY_RATING || '--'}</td>
                    <td>{equipment[slot].MASTERY_RATING || '--'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
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
                <td>{equipment.HEAD && equipment.HEAD.ilvl}</td>
                <td>{equipment.NECK && equipment.NECK.ilvl}</td>
                <td>{equipment.SHOULDER && equipment.SHOULDER.ilvl}</td>
                <td>{equipment.BACK && equipment.BACK.ilvl}</td>
                <td>{equipment.CHEST && equipment.CHEST.ilvl}</td>
                <td>{equipment.WRIST && equipment.WRIST.ilvl}</td>
                <td>{equipment.HANDS && equipment.HANDS.ilvl}</td>
                <td>{equipment.WAIST && equipment.WAIST.ilvl}</td>
                <td>{equipment.LEGS && equipment.LEGS.ilvl}</td>
                <td>{equipment.FEET && equipment.FEET.ilvl}</td>
                <td>{equipment.FINGER_1 && equipment.FINGER_1.ilvl}</td>
                <td>{equipment.FINGER_2 && equipment.FINGER_2.ilvl}</td>
                <td>{equipment.TRINKET_1 && equipment.TRINKET_1.ilvl}</td>
                <td>{equipment.TRINKET_2 && equipment.TRINKET_2.ilvl}</td>
                <td>{equipment.MAIN_HAND && equipment.MAIN_HAND.ilvl}</td>
                <td>
                    {(equipment.OFF_HAND && equipment.OFF_HAND.ilvl) || equipment.MAIN_HAND.ilvl}
                </td>
            </tr>
        </tbody>
    </table>
</div>
