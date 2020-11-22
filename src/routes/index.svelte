<script lang="ts">
	import { Button, FormField, TextField } from "attractions";
	import { goto } from "@sapper/app";

	let region = "us";
	let realm = "tichondrius";
	let character = "yosprey";
</script>

<style lang="scss">
	@import "../theme/attractions-theme";
</style>

<svelte:head>
	<title>Shadowlands Gear Planner</title>
</svelte:head>

<div>
	<FormField name="Region" required>
		<TextField class="input" placeholder="us" bind:value={region} />
	</FormField>
	<FormField name="Realm" required>
		<TextField class="input" placeholder="tichondrius" bind:value={realm} />
	</FormField>
	<FormField name="Character" required>
		<TextField class="input" placeholder="yosprey" bind:value={character} />
	</FormField>
	<Button filled on:click={() => goto(`/${region}/${realm}/${character}`)}>
		Load Character
	</Button>
</div>
