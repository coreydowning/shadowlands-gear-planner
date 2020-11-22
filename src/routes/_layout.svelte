<script lang="ts">
</script>

<style lang="scss">
	@import "../theme/attractions-theme";

	.wrapper {
		height: 100vh;
		width: 100%;
		background-color: $background;
	}
	main {
		position: relative;
		max-width: 56em;
		padding: 2rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<div class="wrapper">
	<main>
		<slot />
	</main>
</div>
