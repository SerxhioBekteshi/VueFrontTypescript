<!-- <template>
  <div class="card flex justify-content-center">
    <Dropdown v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="Select a City"
      class="w-full md:w-14rem" />
  </div>

  <Button icon="pi pi-arrow-right" style="margin-left: 100px; margin-top: 100px;" label="Open Drawer"
    @click="openDrawerFunction" />

  <Button icon="pi pi-arrow-right" style="margin-left: 100px; margin-top: 100px;" label="Open Modal"
    @click="openModalFunction" />

  <Modal ref="modalRef" :openModal="this.openModal" @handleClose="handleCloseDrawer" :title="'Serxhio ModalDrawer'"
    :actions="drawerActions"> Are you sure you want to delete </Modal>


  <Drawer v-model:openDrawer="this.openDrawer" @handleClose="handleCloseDrawer" :title="'Serxhio Drawer'"
    :actions="drawerActions">
    <form>
      <div class="flex flex-wrap  mb-1 gap-1">
        <label for="username" class="p-sr-only">Username</label>
        <InputText class="fullWidth" id="username" placeholder="Username" v-model="username" />
        <ValidationError v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</ValidationError>
      </div>
      <div class="flex flex-wrap  mb-1  gap-1">
        <label for="email" class="p-sr-only">email</label>
        <InputText class="fullWidth" id="email" placeholder="Email" v-model="email" />
        <ValidationError v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</ValidationError>
      </div>
      <div class="flex flex-wrap  mb-1  gap-1">
        <label for="password" class="p-sr-only">Password</label>
        <InputText class="fullWidth" type="password" id="password" placeholder="Password" v-model="password.password" />
        <ValidationError v-if="v$.password.password.$error">{{ v$.password.password.$errors[0].$message }}
        </ValidationError>
      </div>
      <div class="flex flex-wrap  mb-1  gap-1">
        <label for="confirmPassword" class="p-sr-only">Confirm Password</label>
        <InputText class="fullWidth" type="password" id="confirmPassword" placeholder="Confirm password"
          v-model="password.confirm" />
        <ValidationError v-if="v$.password.confirm.$error">{{ v$.password.confirm.$errors[0].$message }}
        </ValidationError>
      </div>
    </form>
  </Drawer>
</template>

<script lang="ts">
import Dropdown from 'primevue/dropdown';
import Drawer from '../components/Drawer.vue';
import Modal from '../components/Modal.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ValidationError from '../components/ValidationError.vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

export default {
  name: 'HelloWorld',
  components: {
    Dropdown,
    Drawer,
    Button,
    InputText,
    ValidationError,
    Modal
  },
  props: {
    msg: String
  },
  created() {
  },
  mounted() {
  },
  methods: {

    openDrawerFunction() {
      this.openDrawer = true
    },
    async openModalFunction() {
      this.openModal = true
      await this.$nextTick()
    },
    handleCloseDrawer() {
      this.openDrawer = false;
      this.openModal = false
    },
    submitForm() {
      this.v$.$validate()
      if (!this.v$.$errors) {
        alert('FORM SUCCESSFULLY SUBMITTED')
      }
      else {
      }
    },
  },
  data() {
    return {
      v$: useVuelidate(),
      openDrawer: false,
      openModal: false,
      drawerActions: [
        { component: Button, props: { type: 'Submit', icon: "pi pi-times", label: 'Submit', severity: 'primary', onClick: this.submitForm, } },
        { component: Button, props: { label: 'Cancel', icon: "pi pi-check", severity: 'info', onClick: this.handleCloseDrawer } }
      ],
      email: "",
      username: "",
      selectedCity: null,
      password: {
        password: '',
        confirm: '',
      },
      cities: [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
      ]
    }
  },
  validations() {
    return {
      email: { required: helpers.withMessage('Field is required', required), email },
      password: {
        password: { required: helpers.withMessage('Field is required', required), minLength: minLength(6) },
        confirm: { required: helpers.withMessage('Field is required', required), sameAs: sameAs(this.password.password) }
      },
      username: { required: helpers.withMessage('Field is required', required) }
    }
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fullWidth {
  width: 100%;
}
</style> -->
