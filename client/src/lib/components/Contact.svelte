<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Eye } from 'lucide-svelte';

    export let firstname: string;
    export let lastname: string;
    export let email: string;
    export let phone: string;
    export let contactUUID: string;

    const currentPath: string = $page.url.pathname;

    console.log(contactUUID);
</script>

<div class="contacts_list_details">
    <div class="contacts_list_details_element">
        <p>{firstname} {lastname}</p>
    </div>
    <div class="contacts_list_details_element">
        <p>{email}</p>
    </div>
    <div class="contacts_list_details_element">
        <p>{phone}</p>
    </div>
    <div class="contacts_list_details_element">
        <button class="contacts_list_detailsBtn" on:click={() => goto(`${currentPath}/${contactUUID}`)}>
            <Eye size=32 color="blue"/>
        </button>
    </div>
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>