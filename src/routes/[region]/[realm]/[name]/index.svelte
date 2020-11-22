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

    export let wowCharacter;
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
</div>
