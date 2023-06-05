<template>
    <Sidebar :visible="true" :show-close-icon="false" :modal="false">
        <div class="card flex justify-content-center">
            <Menu :model="cities" />
        </div>
    </Sidebar>
</template>
  
<script lang="ts">
import Sidebar from 'primevue/sidebar';
import Menu from "primevue/menu"
import { defineComponent } from 'vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'SidebarC',
    components: {
        Sidebar, Menu
    },
    methods: {
        getSeverity(product: any) {
            switch (product.inventoryStatus) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
            }
        }
    },
    data() {
        return {
            selectedCity: null,
            cities: [
                {
                    label: 'Options',
                    items: [
                        {
                            label: 'Update',
                            icon: 'pi pi-refresh',

                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-times',

                        }
                    ]
                },
                {
                    label: 'Navigate',
                    items: [
                        {
                            label: 'Vue Website',
                            icon: 'pi pi-external-link',
                            url: 'https://vuejs.org/'
                        },
                        {
                            label: 'Router',
                            icon: 'pi pi-upload',
                            to: '/fileupload'
                        }
                    ]
                }]
        };
    },
})

</script>
<style src="./SidebarC.css"></style>
