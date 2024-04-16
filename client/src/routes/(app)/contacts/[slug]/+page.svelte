<!-- contacts/:id route for specific contact -->
<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import QR from "@svelte-put/qr/img/QR.svelte";
    import UpdateContactModal from "$lib/components/UpdateContactModal.svelte";
    import type { UpdateContactFormType, UpdateDetailsFromType } from '$lib/utils/types';
    export let data: PageData;
    let deleteError: string = "";
    let url: string = "";

    let showModal: boolean = false;
    const token = data.cookie!;

    let contactInfoValues: UpdateContactFormType = {
        firstname: data.contactInfo.firstname || "",
        lastname: data.contactInfo.lastname || "",
        email: data.contactInfo.email || "",
        phone: data.contactInfo.phone || "",
    }

    let detailsInfoValues: UpdateDetailsFromType = {
        county: data.detailsInfo.county || "",
        city: data.detailsInfo.city || "",
        street: data.detailsInfo.street || "",
        entrance: data.detailsInfo.entrance || "",
        block: data.detailsInfo.block || "",
        apartment: data.detailsInfo.apartment || "",
    }

    const triggerModal = () => {
        showModal = !showModal;
    }

    const capitalizeFirstLetter = (str: string) => {
        
        if (str.length > 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str; 
        }
    }

    const deleteContact = async () => {

        const contactData = {
            contactUUID: data.contactUUID,
        }

        const response1 = await fetch('https://contact-platform.onrender.com/contact/delete', {
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

    const refetchData = async () => {
        const dataContactUUID = {
            contactUUID: data.contactUUID,
        }

        const response1 = await fetch('https://contact-platform.onrender.com/contact/getContactByUUID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.cookie}`
            },
            body: JSON.stringify(dataContactUUID),
        });

        const status1 = response1.status;

        if (status1 === 200) {
            const contactJson = await response1.json();
            contactInfoValues = contactJson.contact;

            const detailsDataUUID = {
                contactUUID: data.contactUUID,
            }

            const response2 = await fetch('https://contact-platform.onrender.com/contactDetails/getDetailsOfContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.cookie}`
                },
                body: JSON.stringify(detailsDataUUID),
            });

            const status2 = response2.status;

            if (status2 === 200) {
                const detailsJson = await response2.json();
                detailsInfoValues = {
                    county: detailsJson.details.county,
                    city: detailsJson.details.city,
                    street: detailsJson.details.street,
                    entrance: detailsJson.details.entrance,
                    block: detailsJson.details.block,
                    apartment: detailsJson.details.apartment,
                };
            }
            else {
                goto('/logout');
            }
        }
        else {
            goto('/logout');
        }
    }

    onMount(() => {
        url = window.location.href
    });
</script>

<UpdateContactModal showModal={showModal} token={token} refetchData={refetchData} contactUUID={data.contactUUID}
    triggerModal={triggerModal} contactInfoValues={contactInfoValues} detailsInfoValues={detailsInfoValues} />

<div class="contact_details_wrapper">
    <h1>Contact Info</h1>
    {#if deleteError.length > 0}
        <p class="delete_error">An error has occured, try again.</p>
    {/if}
    <div class="contact_details_split">
        <div class="contact_details_items">
            {#each Object.entries(contactInfoValues) as [key, value]}
                <div class="contact_details_item">
                    <p class="title">{capitalizeFirstLetter(key)}</p>
                    <p class="detail">{value || '-'}</p>
                </div>
            {/each}
            {#each Object.entries(detailsInfoValues) as [key, value]}
                <div class="contact_details_item">
                    <p class="title">{capitalizeFirstLetter(key)}</p>
                    <p class="detail">{value || '-'}</p>
                </div>
            {/each}
        </div>
        <div class="qr_wrapper">
            <QR
                data={`${url}`}
                anchorOuterFill="blue"
                moduleFill="black"
                anchorInnerFill="blue"
                backgroundFill="lightblue"
                width="200"
                height="200"
            />
        </div>
    </div>
    <div class="contact_details_btn_wrapper">
        <button class="contact_details_update_btn" on:click={triggerModal}>
            Update contact
        </button>
        <button class="contact_details_delete_btn" on:click={deleteContact}>
            Delete contact
        </button>
    </div>
</div>

<style lang="scss" global>
    @import '../../../../styles/styles.scss';
</style>