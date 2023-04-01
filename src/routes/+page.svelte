<script lang="ts">
    import { japanese } from '$lib/assets/data/kana'
    import Controller from '$lib/components/Controller.svelte'
    import { get_kana, KANA_BOUNDS, RARE_MOJI } from '$lib/utils'

    let state = {
        run: false,
        replay: false,
        auto_play: true,
        rare_moji: false
    }
    
    let idx = 1
    let kana = get_kana(idx)

    $: example = japanese[kana][idx]?.example
    async function play_moji_pronunciation() {
        if (RARE_MOJI.includes(idx)) {
            state.rare_moji = true
            return
        }
        state.rare_moji = false
        state.auto_play = false
        const i = idx <= KANA_BOUNDS.katakana ? ((idx - 1) % KANA_BOUNDS.hiragana) + 1 : idx

        let moji_pronunciation = new Audio(`/audio/${i}.mp3`)
        moji_pronunciation.play()
    }
</script>

<div
    class="hero relative min-h-screen lg:bg-[url('/images/bg.webp')] bg-[url('/images/bg-sm.webp')]"
>
    <h1 class="absolute top-8 right-8 text-7xl font-['wasabi'] select-none text-black">
        Japanese Jouzu
    </h1>
    <div class="hero-content text-center">
        <div class="stack">
            <div class="card bg-base-100 border-b border-l border-neutral shadow-xl">
                <div class="card-body relative h-96 w-80">
                    <!-- Hack to get around autoplay -->
                    {#if state.run}
                        <div class="flex h-56 justify-center">
                            <!-- Load svg to replay -->
                            {#if !state.replay}
                                <!-- Load svg or show buffer -->
                                {#await import(`$lib/assets/svg/${idx}.svg?component`)}
                                    <iconify-icon
                                        class="m-auto mb-6 fill-base-content"
                                        icon="eos-icons:bubble-loading"
                                        width="64"
                                    />
                                {:then moji}
                                    <svelte:component this={moji.default} height="224" />
                                    <!-- svelte-ignore empty-block -->
                                    {#if state.auto_play}
                                        {@const autoplay_audio = play_moji_pronunciation()}
                                    {/if}
                                {:catch}
                                    IDK, try refreshing
                                {/await}
                            {/if}
                        </div>
                        <!-- Examples -->
                        <div class="flex justify-between items-center flex-row">
                            <div>{example?.word}</div>
                            <div class="select-none">-</div>
                            <div>{example?.romanji}</div>
                            <div class="select-none">-</div>
                            <div>{example?.meaning}</div>
                        </div>
                        <!-- Navigation -->
                        <div class="absolute bottom-8 left-0 w-64 mx-8 flex justify-between">
                            <Controller bind:state bind:idx {play_moji_pronunciation} />
                        </div>
                    {:else}
                        <button class="btn w-24 btn-xs m-auto" on:click={() => (state.run = true)}>
                            Let's Start
                        </button>
                    {/if}
                </div>
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
