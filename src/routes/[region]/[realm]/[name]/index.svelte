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
    @import "../../../../theme/attractions-theme";
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
</div>
