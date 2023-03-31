<script lang="ts">
    import { kana } from '$lib/assets/data/kana'
    const rare_mojis = [45, 46, 49, 119, 123, 121, 149, 150, 151, 152]
    const state = {
        play: false,
        restart: false
    }
    let strange_moji = false
    let idx = 1
    let current_kana = idx < 75 ? 'hiragana' : 'katakana'

    $: example = kana[current_kana][`${idx}`]?.example ?? { word: '', romanji: '', meaning: '' }

    const icon_opts = {
        class: 'text-base-content',
        width: '24',
        height: '24'
    }

    let total_moji = 152
    let tooltip_hover_none = 'hover:before:opacity-0 hover:after:opacity-0'

    async function change_moji(i: number) {
        idx = ((idx - 1 + i + total_moji) % total_moji) + 1
    }

    async function replay_moji_animation() {
        state.restart = true
        setTimeout(() => (state.restart = false))
    }

    async function play_moji_pronunciation() {
        if (rare_mojis.includes(idx)) {
            strange_moji = true
            return
        }
        strange_moji = false
        let i = idx % 75
        let moji_pronunciation = new Audio(`/audio/${i}.mp3`)
        moji_pronunciation.play()
    }
</script>

<div class="hero relative min-h-screen lg:bg-[url('/bg.webp')] bg-[url('/bg-sm.webp')]">
    <h1 class="absolute top-8 right-8 text-7xl font-['wasabi'] select-none text-black">
        Japanese Jouzu
    </h1>
    <div class="hero-content text-center">
        <div class="stack">
            <div class="card bg-base-100 border-b border-l border-neutral shadow-xl">
                <div class="card-body relative h-96 w-80">
                    {#if state.play}
                        <div class="flex h-56 justify-center">
                            {#if !state.restart}
                                {#await import(`$lib/assets/svg/${idx}.svg?component`)}
                                    <iconify-icon
                                        class="m-auto mb-6 fill-base-content"
                                        icon="eos-icons:bubble-loading"
                                        width="64"
                                    />
                                {:then moji}
                                    <svelte:component this={moji.default} height="224" />
                                    {@const autoplay_audio = play_moji_pronunciation()}
                                {:catch}
                                    IDK, try refreshing
                                {/await}
                            {/if}
                        </div>
                        <div class="flex justify-between items-center flex-row">
                            <div>{example?.word}</div>
                            <div class="select-none">-</div>
                            <div>{example?.romanji}</div>
                            <div class="select-none">-</div>
                            <div>{example?.meaning}</div>
                        </div>
                        <div class="absolute bottom-8 left-0 w-64 mx-8 flex justify-between">
                            <button class="w-6 h-6" on:click={() => change_moji(-1)}>
                                <iconify-icon
                                    icon="ic:twotone-keyboard-double-arrow-left"
                                    {...icon_opts}
                                />
                            </button>
                            <button class="w-6 h-6" on:click={replay_moji_animation}>
                                <iconify-icon icon="ic:twotone-replay" {...icon_opts} />
                            </button>
                            <div
                                class="tooltip {!strange_moji ? tooltip_hover_none : ''}"
                                data-tip="Rarely Used"
                            >
                                <button class="w-6 h-6" on:click={play_moji_pronunciation}>
                                    <iconify-icon
                                        class:text-error={strange_moji}
                                        icon="ic:twotone-volume-up"
                                        {...icon_opts}
                                    />
                                </button>
                            </div>
                            <button class="w-6 h-6" on:click={() => change_moji(+1)}>
                                <iconify-icon
                                    icon="ic:twotone-keyboard-double-arrow-right"
                                    {...icon_opts}
                                />
                            </button>
                        </div>
                    {:else}
                        <button class="btn w-24 btn-xs m-auto" on:click={() => (state.play = true)}>
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
