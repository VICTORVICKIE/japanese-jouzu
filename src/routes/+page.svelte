<script lang="ts">
    import { japanese } from '$lib/assets/data/kana'
    import Controller from '$lib/components/Controller.svelte'
    import { get_kana, type State } from '$lib/utils'

    let state: State = {
        start: false,
        play_stroke: false,
        play_audio: false,
        autoplay_audio: true,
        rare_moji: false
    }

    let idx = 1
    let kana = get_kana(idx)

    async function trigger_audio() {
        state = { ...state, play_audio: true, autoplay_audio: false }
    }

    $: example = japanese[kana][idx]?.example
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
                    {#if state.start}
                        <div class="flex h-56 justify-center">
                            <!-- Load svg to replay -->
                            {#if !state.play_stroke}
                                <!-- Load svg or show buffer -->
                                {#await import(`$lib/assets/svg/${idx}.svg?component`)}
                                    <iconify-icon
                                        class="m-auto mb-6 fill-base-content"
                                        icon="eos-icons:bubble-loading"
                                        width="64"
                                    />
                                {:then moji}
                                    <svelte:component
                                        this={moji.default}
                                        on:click={() => console.log('wont work')}
                                        height="224"
                                    />
                                    <!-- svelte-ignore empty-block -->
                                    {#if state.autoplay_audio}
                                        {@const autoplay_audio = trigger_audio()}
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
                            <Controller bind:state bind:idx />
                        </div>
                    {:else}
                        <button
                            class="btn w-24 btn-xs m-auto"
                            on:click={() => (state.start = true)}
                        >
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
