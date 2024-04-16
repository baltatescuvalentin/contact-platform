<script lang="ts">
    import { Home } from 'lucide-svelte';
    import { BookUser } from 'lucide-svelte';
    import { User } from 'lucide-svelte';
    import { LogIn } from 'lucide-svelte';
    import { LogOut } from 'lucide-svelte';

    export let token: string | undefined;
</script>


<div class="navbar">
    <div class="navbar_elements">
        <div class="upper_elements">
            <a href='/' class="navbar_element">
                <Home size=26 />
                <p>Home</p>
            </a>
            <a href='/contacts' class="navbar_element">
                <BookUser size=26 />
                <p>Contacts</p>
            </a>
        </div>
        {#if token}
            <div class="lower_elements">
                <a href='/profile' class="navbar_element">
                    <User size=26 />
                    <p>Profile</p>
                </a>
                <a href='/logout' class="navbar_element">
                    <LogOut size=26 />
                    <p>Log out</p>
                </a>
            </div>
        {:else}
            <div class="lower_elements">
                <a href='/login' class="navbar_element">
                    <LogIn size=26 />
                    <p>Log in</p>
                </a>
            </div>
        {/if}
    </div>
    
</div>


<style lang="scss" global>
    @import '../../styles/styles.scss';
</style>