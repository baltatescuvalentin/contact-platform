<script lang="ts">
    import { Home } from 'lucide-svelte';
    import { BookUser } from 'lucide-svelte';
    import { User } from 'lucide-svelte';
    import { LogIn } from 'lucide-svelte';
    import { LogOut } from 'lucide-svelte';
    import { CircleX } from 'lucide-svelte';

    export let token: string | undefined;
    export let openMenu: boolean;
    export let triggerNavbar: () => void;
</script>

<div class={`${openMenu === true ? 'mobile_navbar_visible' : 'mobile_navbar_hidden'}`}>
    <div class="mobile_navbar_elements">
        <div class="upper_elements">
            <div class="mobile_navbar_close_btn_wrapper">
                <button on:click={triggerNavbar} class="mobile_navbar_close_btn">
                    <CircleX color="red" size=54/>
                </button>
            </div>
            
            <a href='/' class="navbar_element" on:click={triggerNavbar}>
                <Home size=42 />
                <p>Home</p>
            </a>
            <a href='/contacts' class="navbar_element" on:click={triggerNavbar}>
                <BookUser size=42 />
                <p>Contacts</p>
            </a>
        </div>
        {#if token}
            <div class="lower_elements">
                <a href='/profile' class="navbar_element" on:click={triggerNavbar}>
                    <User size=42 />
                    <p>Profile</p>
                </a>
                <a href='/logout' class="navbar_element" on:click={triggerNavbar}>
                    <LogOut size=42 />
                    <p>Log out</p>
                </a>
            </div>
        {:else}
            <div class="lower_elements">
                <a href='/login' class="navbar_element" on:click={triggerNavbar}>
                    <LogIn size=42 />
                    <p>Log in</p>
                </a>
            </div>
        {/if}
    </div>
    
</div>

<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>