<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
</script>

<div class="error_page_wrapper">
    <div>
        <h1>{$page.status} {$page.error?.message}</h1>
        <button class="error_page_btn" on:click={() => goto('/')}>
            Homepage
        </button>
    </div>
</div>

<style lang="scss" global>
    @import '../../../../styles/styles.scss';
</style>