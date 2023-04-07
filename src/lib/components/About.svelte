<script lang="ts">
    export let show_about = false
</script>

<div class="relative card-body h-96 w-80">
    <button on:click={() => (show_about = false)}>
        <iconify-icon class="absolute top-4 right-4 text-xl" icon="game-icons:knife-fork" />
    </button>
    <div class="grid grid-cols-1 grid-rows-2 h-full font-['wasabi'] tracking-widest">
        <div class="flex items-center justify-start">
            <div class="w-fit">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="/images/victor.png" alt="victor" />
                    </div>
                </div>
            </div>
            <div class="ml-8">
                <h1 class="text-lg font-bold">Victor Vickie</h1>
                <h2 class="text-xs">Developer</h2>
            </div>
        </div>
        <div class="flex items-center justify-end">
            <div class="mr-8">
                <h1 class="text-lg font-bold">Melicks Aristo</h1>
                <h2 class="text-xs">Digital Strategist</h2>
            </div>
            <div class="w-fit">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="/images/melicks.jpg" alt="melicks" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
