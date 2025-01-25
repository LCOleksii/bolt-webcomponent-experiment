<script>
    import POCController from "./controllers/POCController.svelte";
    export let id;
    export let view;
    export let debug = false;
</script>
<div class={debug?"component debug":"status"} data-id="{id}">
    {#if view==="poc"}
        <POCController name="{view}" debug="{debug}"/>
    {/if}
</div>
<style>
    .component{
        display: block;
        height: 100%;
        width: 100%;
        background: lightblue;
    }

    .component.debug{
        border: green;
    }
</style>