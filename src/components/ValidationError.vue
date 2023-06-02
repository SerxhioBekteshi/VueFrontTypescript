<template>
    <div>
        <InlineMessage class="custom-inline-message" severity="error">
            <slot></slot>
        </InlineMessage>
    </div>
</template>
  
<script lang="ts">
import InlineMessage from 'primevue/inlinemessage';

export default {
    name: 'ValidationError',
    components: {
        InlineMessage
    },
    data() {
        return {

        }
    },
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
::v-deep .p-inline-message-text {
    font-size: 0.75rem !important;
}

::v-deep .p-icon,
::v-deep .p-inline-message-icon {
    width: 0.75rem !important;
    height: 0.75rem !important
}

.custom-inline-message {
    width: 100% !important;
    background: none !important;
    display: flex !important;
    justify-content: left !important;
    padding: 0.2rem !important;
}
</style>
  