<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import type { AddContactFormType, ContactInfoType } from '$lib/utils/types';
    import { CircleX } from 'lucide-svelte';
    import { page } from '$app/stores';
    import * as yup from 'yup';
    import { enhance } from '$app/forms';

    export let showModal: boolean;
    export let userEmail: string;
    export let token: string;
    export let refetchData: () => Promise<void>;

    let dialog: HTMLDialogElement;
    let loading: boolean = false;

    console.log($page.url.href);

    $: if (dialog && showModal) dialog.showModal();

    let errors: AddContactFormType = {
        phone: "",
        firstname: "",
        lastname: "",
        email: "",
        county: "",
        city: "",
        street: "",
        block: "",
        entrance: "",
        apartment: "",
    }

    let submitError: string = "";

    let values: AddContactFormType = {
        phone: "",
        firstname: "",
        lastname: "",
        email: "",
        county: "",
        city: "",
        street: "",
        block: "",
        entrance: "",
        apartment: "",
    }

    const schema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email is required'),
        phone: yup.string().required('Phone is required'),
        firstname: yup.string().required('Username is required'),
        lastname: yup.string().required('Username is required'),
        county: yup.string().required('County is required'),
        city: yup.string().required('City is required'),
        street: yup.string().required('Street is required'),
        block: yup.string(),
        entrance: yup.string().required('Entrance is required'),
        apartment: yup.string(),
    });

    const sumbitForm = async () => {
        try {
            loading = true;
            await schema.validate(values, { abortEarly: false });
            errors = {
                phone: "",
                firstname: "",
                lastname: "",
                email: "",
                county: "",
                city: "",
                street: "",
                block: "",
                entrance: "",
                apartment: "",
            }
            const contactData = {
                email: values.email,
                phone: values.phone,
                firstname: values.firstname,
                lastname: values.lastname,
                userEmail: userEmail,
            }

            const response1 = await fetch('http://localhost:3001/contact/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(contactData),
            });

            const status1 = response1.status;

            if (status1 === 201) {

                const detailsData = {
                    county: values.county,
                    city: values.city,
                    street: values.street,
                    block: values.block,
                    apartment: values.apartment,
                    entrance: values.entrance,
                    contactEmail: values.email,
                }

                const response2 = await fetch('http://localhost:3001/contactdetails/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(detailsData),
                });

                const status2 = response2.status;

                if (status2 === 201) {
                    dialog.close();
                    invalidateAll();
                    refetchData();
                }
                else {
                    const detailsJson = await response2.json();
                    submitError = detailsJson.message;
                }
            }
            else {
                const contactJson = await response1.json();
                submitError = contactJson.message;
            }
        }
        catch(error: any) {
            errors = error.inner.reduce((acc: any, err: any) => {
                return { ...acc, [err.path]: err.message};
            }, {});
        }
        finally {
            loading = false;
        }
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => (showModal = false)} class="dialog_add_contact">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="dialog_add_contact_header">
            <h2>Add contact</h2>
            <button on:click={() => dialog.close()}><CircleX color="red" size=34/></button>
        </div>
        <hr />
        {#if submitError !== ""}
            <p class="dialog_add_contact_submit_error">{submitError}</p>
        {/if}
        <form class="dialog_add_contact_form">
            <input type="text" class="dialog_add_contact_input" placeholder="Email" id="email" bind:value={values.email}/>
            {#if errors?.email}
                <label for="email" class="auth_error">{errors?.email}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Phone" id="phone" bind:value={values.phone}/>
            {#if errors?.phone}
                <label for="phone" class="auth_error">{errors?.phone}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Firstname" id="firstname" bind:value={values.firstname}/>
            {#if errors?.firstname}
                <label for="firstname" class="auth_error">{errors?.firstname}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Lastname" id="lastname" bind:value={values.lastname}/>
            {#if errors?.lastname}
                <label for="lastname" class="auth_error">{errors?.lastname}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="County" id="county" bind:value={values.county}/>
            {#if errors?.county}
                <label for="county" class="auth_error">{errors?.county}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="City" id="city" bind:value={values.city}/>
            {#if errors?.city}
                <label for="city" class="auth_error">{errors?.city}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Street" id="street" bind:value={values.street}/>
            {#if errors?.street}
                <label for="street" class="auth_error">{errors?.street}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Block" id="block" bind:value={values.block}/>
            <input type="text" class="dialog_add_contact_input" placeholder="Entrance" id="entrance" bind:value={values.entrance}/>
            {#if errors?.entrance}
                <label for="entrance" class="auth_error">{errors?.entrance}</label>
            {/if}
            <input type="text" class="dialog_add_contact_input" placeholder="Apartment" id="apartment" bind:value={values.apartment}/>
        </form>
        <button type="submit" class="dialog_add_contact_submit" disabled={loading ? true : false} on:click={sumbitForm}>
            Submit
        </button>
    </div>
</dialog>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>