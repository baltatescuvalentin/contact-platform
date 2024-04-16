<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<div class="profile_wrapper">
    <h2>Hello, {data.user?.firstname}</h2>
    <div class="profile_content">
        <button on:click={() => goto('/resetpassword')} class="reset_password_btn">
            Reset password
        </button>
    </div>
</div>

<style lang="scss" global>
    @import '../../../styles/styles.scss';
</style>