<template>
  <section class="section">
    <div class="heading columns">
    </div>
    <div class="content columns">
      <div class="column is-four-fifths">
        <div class="columns">
          <h1 class="title column is-11">Shifts<br><span class="underline" /></h1>
          <button class="button is-dark" @click="showModal()">
            {{ showForm ? 'Close Edit' : 'Add Shift' }}
          </button>
        </div>
        <div v-if="shifts.length > 0">
          <card :data="shift" icon="github" v-for="shift in shifts" :key="shift.id" @editShift="editShift" @deleteShift="showDeleteConfirm">
            {{ shift.description }}
          </card>
        </div>
        <div v-else>
          No shifts to show
        </div>
      </div>
      <shift-form v-if="showForm" :data="formData" class="column" @closeForm="showModal()"/>
    </div>

  </section>
</template>

<script>
import Card from '~/components/Card'
import ShiftForm from '~/components/ShiftForm'

export default {
  name: 'IndexPage',
  components: {
    Card,
    ShiftForm
  },
  data() {
    return {
      showForm: false,
      formData: null
    }
  },
  computed: {
    shifts () {
      return this.$store.state.shifts.list
    }
  },
  methods: {
    showModal() {
      this.showForm = !this.showForm
    },
    editShift(data) {
      console.log('edit', data)
      this.showModal()
      this.formData = data
    },
    showDeleteConfirm(data) {
      this.$buefy.dialog.confirm({
          message: 'Are you sure you want delete this shift?',
          onConfirm: () => {
            this.deleteShift(data)
          }
      })
    },
    deleteShift(data) {
      try {
        this.$store.commit('shifts/remove', data)
        this.$buefy.toast.open({
            message: 'Delete successful!',
            position: 'is-top',
            type: 'is-success'
        })
      } catch (e) {
        this.$buefy.toast.open({
            duration: 5000,
            message: 'Delete failed!',
            position: 'is-top',
            type: 'is-danger'
        })
      }
    }
  }
}
</script>
<style>
.title::after {
  content: '';
  width: 40px;
  display: block;
  height: 5px;
  background: red;
}
</style>