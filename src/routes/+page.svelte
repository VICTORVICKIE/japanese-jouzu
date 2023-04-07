<script lang="ts">
    import About from '$lib/components/About.svelte'
    import KanaCard from '$lib/components/KanaCard.svelte'
    import Settings from '$lib/components/Settings.svelte'
    import type { State } from '$lib/utils'

    let state: State = {
        start: false,
        stroke_order: 'visible',
        play_stroke: false,
        play_audio: false,
        autoplay_audio: true,
        rare_moji: false
    }

    let show_about = false
    let idx = 1
    const bg_class = 'lg:bg-[url("/images/bg.webp")] bg-[url("/images/bg-sm.webp")]'
</script>

<div class="hero relative min-h-screen {bg_class}">
    <h1 class="absolute top-8 right-8 text-7xl font-['wasabi'] select-none text-black">
        Japanese Jouzu
    </h1>
    <Settings bind:state bind:show_about />
    <div class="hero-content text-center">
        <div class="stack">
            <div class="card bg-base-100 border-b border-l border-neutral shadow-xl">
                {#if show_about}
                    <About bind:show_about />
                {:else}
                    <KanaCard bind:state bind:idx />
                {/if}
            </div>
            <div class="card bg-base-100 border border-neutral shadow-xl">
                <div class="card-body h-96 w-80" />
            </div>
            <div class="card bg-base-100 border border-neutral shadow-xl">
                <div class="card-body h-96 w-80" />
            </div>
        </div>
    </div>
</div>
