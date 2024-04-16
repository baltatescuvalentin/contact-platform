<script lang="ts">
    import { Menu } from 'lucide-svelte';
    export let triggerNavbar: () => void;
</script>

<div class="navbar_btn_wrapper">
    <button class="navbar_btn" on:click={triggerNavbar}>
        <Menu size=36 color="gray"/>
    </button>
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>