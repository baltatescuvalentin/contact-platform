<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";

    export let data: PageData;
    let deleteError: string = "";

    const capitalizeFirstLetter = (str: string) => {
        
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str; 
        }
    }

    const deleteContact = async () => {

        const contactData = {
            email: data.contactInfo.email,
        }

        const response1 = await fetch('http://localhost:3001/contact/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.cookie}`,
            },
            body: JSON.stringify(contactData),
        });

        const status1 = response1.status;

        if (status1 === 200) {
            goto('/contacts');
        }
        else {
            const contactJson = await response1.json();
            deleteError = contactJson.message;
        }

    }
</script>

<div class="contact_details_wrapper">
    <h1>Contact Info</h1>
    {#if deleteError.length > 0}
        <p class="delete_error">An error has occured, try again.</p>
    {/if}
    <div class="contact_details_items">
        {#each Object.entries(data.contactInfo) as [key, value]}
            <div class="contact_details_item">
                <p class="title">{capitalizeFirstLetter(key)}</p>
                <p class="detail">{value || '-'}</p>
            </div>
        {/each}
        {#each Object.entries(data.detailsInfo) as [key, value]}
            <div class="contact_details_item">
                <p class="title">{capitalizeFirstLetter(key)}</p>
                <p class="detail">{value || '-'}</p>
            </div>
        {/each}
    </div>
    <button class="contact_details_delete_btn" on:click={deleteContact}>
        Delete contact
    </button>
</div>

<style lang="scss" global>
    @import '../../../../styles/styles.scss';
</style>