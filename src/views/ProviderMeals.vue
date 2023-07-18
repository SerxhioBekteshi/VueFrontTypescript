
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import * as yup from "yup";
// import { ProductService } from '@/service/ProductService';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'   // optional
import Rating from 'primevue/rating';
import Tag from "primevue/tag"
import Drawer from "../components/Drawer.vue"
import { useForm, useField } from 'vee-validate';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";

onMounted(() => {
    // ProductService.getProducts().then((data) => (products.value = data.slice(0, 12)));
});

const products = ref<any>([{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}, {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},]);

const form = ref({
    name: '',
    email: '',
    password: '',
});

const formSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
});

const { handleSubmit } = useForm({
    validationSchema: formSchema,
});

const errors = useForm().errors ?? {};

// const { setFieldValue, resetForm } = useForm();

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');



const layout = ref<'grid' | 'list' | undefined>('grid'); // Define the type for 'layout'
const openDrawer = ref<boolean>(false);
const drawerActions = ref<any[]>([
    { component: Button, props: { type: 'Submit', icon: "pi pi-times", label: 'Submit', severity: 'primary', } },
    { component: Button, props: { label: 'Cancel', icon: "pi pi-check", severity: 'info', } }
])
const getSeverity = (product: any) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return undefined;
    }
}

const openDrawerFunction = () => {
    openDrawer.value = true
}
const handleCloseDrawer = () => {
    openDrawer.value = false;
}

</script>
<template>
    <div class="card">
        <DataView :value="products" :layout="layout" dataKey="id">
            <template #header>
                <div class="flex justify-content-between">
                    <Button @click="openDrawerFunction"> Add Meal </Button>
                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>

            <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                            :alt="slotProps.data.name" />
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.name }}</div>
                                <Rating :modelValue="slotProps.data.rating" readonly :cancel="false"></Rating>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i>
                                        <span class="font-semibold">{{ slotProps.data.category }}</span>
                                    </span>
                                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)">
                                    </Tag>
                                </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                                <Button icon="pi pi-shopping-cart" rounded
                                    :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag"></i>
                                <span class="font-semibold">{{ slotProps.data.category }}</span>
                            </div>
                            <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)"></Tag>
                        </div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <img class="w-9 shadow-2 border-round"
                                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                                :alt="slotProps.data.name" />
                            <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                            <Rating :modelValue="slotProps.data.rating" readonly :cancel="false"></Rating>
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                            <Button icon="pi pi-shopping-cart" rounded
                                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>

    <div>
        <Drawer v-model:openDrawer="openDrawer" @handleClose="handleCloseDrawer" :title="'Question Type'"
            :actions="drawerActions">
            <form>
                <div class="p-field">
                    <label for="name">Name</label>
                    <InputText v-model="form.name" id="name" :class="{ 'p-invalid': errors.has('name') }"></InputText>
                    <div class="p-error" v-if="errors.has('name')">{{ errors.first('name') }}</div>
                </div>

                <div class="p-field">
                    <label for="email">Email</label>
                    <InputText v-model="form.email" id="email" :class="{ 'p-invalid': errors.has('email') }"></InputText>
                    <div class="p-error" v-if="errors.has('email')">{{ errors.first('email') }}</div>
                </div>

            </form>
        </Drawer>
    </div>
</template>
<style></style>