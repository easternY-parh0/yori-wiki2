<script lang="ts">
  let { role }: { role?: string } = $props();
</script>
{#if role === 'admin' || role === 'super_admin'}
  <span class="badge">{role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
{/if}
<style>.badge { display:inline-block; padding:3px 7px; border-radius:6px; background:var(--surface-green); color:var(--accent); font-size:12px; font-weight:700; }</style>
