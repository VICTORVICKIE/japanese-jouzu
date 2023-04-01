<script lang="ts">
    import 'iconify-icon'
    import '../app.css'
</script>

<slot />

<style>
    @font-face {
        font-family: 'wasabi';
        font-display: swap;
        src: url('/fonts/wasabi.ttf');
    }

    @keyframes -global-draw {
        to {
            stroke-dashoffset: 0;
        }
    }

    :global(svg.jozu path[clip-path]) {
        animation: draw 1s linear forwards var(--d);
        stroke-dasharray: 3337;
        stroke-dashoffset: 3339;
        stroke-width: 128;
        stroke-linecap: round;
        fill: none;
        stroke: #000;
    }

    :global(svg.jozu path[id]) {
        fill: hsl(var(--b2));
    }
</style>
