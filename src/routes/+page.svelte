<script lang="ts">
    const rare_mojis = [45, 46, 49, 119, 123, 121, 149, 150, 151, 152]
    let play = false
    let restart = false
    let strange_moji = false
    let idx = 1
    const icon_opts = {
        class: 'text-base-content ',
        width: '24',
        height: '24'
    }
    let total_kana = 152
    let tooltip_hover_none = 'hover:before:opacity-0 hover:after:opacity-0'

    async function change_kana(i: number) {
        idx = ((idx - 1 + i + total_kana) % total_kana) + 1
    }

    async function replay_kana_animation() {
        restart = true
        setTimeout(() => (restart = false))
    }

    async function play_kana_pronunciation() {
        if (rare_mojis.includes(idx)) {
            strange_moji = true
            return
        }
        strange_moji = false
        let i = idx % 75
        let kana_pronunciation = new Audio(`/audio/${i}.mp3`)
        kana_pronunciation.play()
    }
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="stack">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body relative h-80 w-80">
                    {#if play}
                        <div class="flex h-56 justify-center">
                            {#if !restart}
                                {#await import(`$lib/assets/svg/${idx}.svg?component`)}
                                    <iconify-icon
                                        class="m-auto mb-6 fill-base-content"
                                        icon="eos-icons:bubble-loading"
                                        width="64"
                                    />
                                {:then kana}
                                    <svelte:component this={kana.default} height="224" />
                                    {@const autoplay_audio = play_kana_pronunciation()}
                                {:catch}
                                    IDK, try refreshing
                                {/await}
                            {/if}
                        </div>
                        <div class="absolute bottom-8 left-0 w-64 mx-8 flex justify-between">
                            <button class="w-6 h-6" on:click={() => change_kana(-1)}>
                                <iconify-icon
                                    icon="ic:twotone-keyboard-double-arrow-left"
                                    {...icon_opts}
                                />
                            </button>
                            <button class="w-6 h-6" on:click={replay_kana_animation}>
                                <iconify-icon icon="ic:twotone-replay" {...icon_opts} />
                            </button>
                            <div
                                class="tooltip {!strange_moji ? tooltip_hover_none : ''}"
                                data-tip="Rarely Used"
                            >
                                <button class="w-6 h-6" on:click={play_kana_pronunciation}>
                                    <iconify-icon
                                        class:text-error={strange_moji}
                                        icon="ic:twotone-volume-up"
                                        {...icon_opts}
                                    />
                                </button>
                            </div>
                            <button class="w-6 h-6" on:click={() => change_kana(+1)}>
                                <iconify-icon
                                    icon="ic:twotone-keyboard-double-arrow-right"
                                    {...icon_opts}
                                />
                            </button>
                        </div>
                    {:else}
                        <button class="btn w-24 btn-xs m-auto" on:click={() => (play = true)}>
                            Let's Play
                        </button>
                    {/if}
                </div>
            </div>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body h-80 w-80" />
            </div>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body h-80 w-80" />
            </div>
        </div>
    </div>
</div>
