<!-- main contacts -->
<script lang="ts">
    import type { PageData } from "./$types";
    import Contact from "$lib/components/Contact.svelte";
    import AddContactModal from "$lib/components/AddContactModal.svelte";
    import type { ContactInfoType } from "$lib/utils/types";

    export let data: PageData;
    const token = data.cookie!;
    let contacts: ContactInfoType[] = data.contacts;
    console.log(typeof data.contacts);
    let filter: string;

    let showModal: boolean = false;

    const triggerModal = () => {
        showModal = true;
    }

    const filterData = () => {
        if (filter.length === 0) {
            contacts = data.contacts;
        }
        else {
            contacts = [];
            data.contacts.forEach((element: ContactInfoType) => {
                if (element.firstname.includes(filter) || element.lastname.includes(filter) || element.email.includes(filter) || 
                    element.phone.includes(filter)) {
                        contacts.push(element);
                    }
            });
        }
    }

    const refetchData = async () => {

        const fetchData = {
            email: data.userEmail,
        }

        const response = await fetch('http://localhost:3001/contact/getContactsByUserEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.cookie}`,
            },
            body: JSON.stringify(fetchData),
        });

        const status = response.status;
        if (status === 200) {
            const contactsJson = await response.json();
            contacts = contactsJson.contacts;
        }
    }

</script>

<AddContactModal bind:showModal userEmail={data.userEmail} token={token} refetchData={refetchData}>
</AddContactModal>

<div class="contacts_container">
    <div class="contacts_wrapper">
        <h1>Contacts</h1>
        <div class="contacts_utils">
            <button class="contacts_addBtn" on:click={triggerModal}>
                Add contact
            </button>
            <input class="contacts_filter" type="text" bind:value={filter} placeholder="Search..." on:input={filterData}/>
        </div>
        <div class="contacts_list">
            <div class="contacts_list_details">
                <div class="contacts_list_details_element_title">
                    <p class="utils_p">Full name</p>
                </div>
                <div class="contacts_list_details_element_title">
                    <p class="utils_p">Email</p>
                </div>
                <div class="contacts_list_details_element_title">
                    <p class="utils_p">Phone</p>
                </div>
                <div class="contacts_list_details_element_title">
                    <p class="utils_p">Details</p>
                </div>
            </div>
            {#each contacts as contact}
                <Contact 
                    firstname={contact.firstname} 
                    lastname={contact.lastname} 
                    email={contact.email} 
                    phone={contact.phone} 
                    contactUUID={contact.contactUUID}/>
            {/each}
        </div>
    </div>
</div>

<style lang="scss" global>
    @import '../../../styles/styles.scss';
</style>