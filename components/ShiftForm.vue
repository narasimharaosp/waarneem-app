<template>
  <section class="section">
    <div class="columns">
      <h1 class="title">Create/Edit</h1>
    </div>
    <div class="content container columns">
      <form class="column" @submit.prevent="formEdit()">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="form.title" class="input" type="text" placeholder="Text input">
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea v-model="form.description" class="textarea" placeholder="Textarea"></textarea>
          </div>
        </div>
        <b-field label="Select a date">
          <b-datepicker placeholder="Click to select..." v-model="form.dates" multiple @input="updateInfo()"/>
        </b-field>
        <template v-if="form.info && form.dates">
          <b-collapse class="card mt-4 mb-4 p-0" animation="slide" v-for="(collapse, index) of form.dates" :key="index"
            :open="isOpen == index" @open="isOpen = index" :aria-id="'contentIdForA11y5-' + index">
            <template #trigger="props">
              <div class="card-header" role="button" :aria-controls="'contentIdForA11y5-' + index"
                :aria-expanded="props.open">
                <div class="card-header-title">
                  {{ _getFormattedDate(collapse) }}
                </div>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
                <a class="card-header-icon" @click="removeItem(index)">
                  <b-icon :icon="'close'">
                  </b-icon>
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                <div class="field">
                  <label class="label">Start</label>
                  <div class="control">
                    <b-timepicker v-model="form.info[index].start" inline></b-timepicker>
                  </div>
                </div>
                <div class="field">
                  <label class="label">End</label>
                  <div class="control">
                    <b-timepicker v-model="form.info[index].end" inline></b-timepicker>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Price</label>
                  <div class="control">
                    <input v-model="form.info[index].price" class="input" type="number" placeholder="Text input">
                  </div>
                </div>
                <b-field label="Simple">
                  <b-select placeholder="Select a type" v-model="form.info[index].type">
                    <option v-for="option in options" :value="option" :key="option">
                      {{ option }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </b-collapse>
        </template>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link is-light" @click.prevent="resetForm()">Reset</button>
          </div>
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
  
<script>
import { getFormattedDate } from '@/utils'
export default {
  name: 'ShiftForm',
  props: {
    data: {
      type: Object,
      default: {
        title: '',
        description: '',
        dates: [],
        info: []
      }
    }
  },
  data() {
    return {
      isOpen: 0,
      showForm: false,
      form: {
        title: '',
        description: '',
        dates: [],
        info: []
      },
      options: ['Consultation', 'Telephone', 'Ambulance']
    }
  },
  mounted() {
    if(data.title) {
      console.log('edit mode')
    }
  },
  methods: {
    _getFormattedDate: getFormattedDate,
    resetForm () {
      this.form = {
        title: '',
        description: '',
        dates: [],
        info: []
      }
    },
    formEdit() {
      if (this.form.title.length === 0 || this.form.title.length > 100) {
        this.error('Title must be less than 100 characters')
        return
      }
      if(this.form.description && this.form.description.length > 500) {
        this.error('Description must be less than 500 characters')
        return
      }
      if(this.form.dates.length === 0 || this.form.dates.length > 10) {
        this.error('Dates can be selected - Minimum 1, Maximum 10')
        return
      }
      if(!this.getInfoCondition()) {
        this.error('Make sure the time(HH:MM), price and type is selected')
        return
      }
      this.$store.commit('shifts/add', this.form)
      this.success()
      this.resetForm()
      this.$emit('closeForm')
    },
    getInfoCondition () {
      return this.form.info.length && this.form.info.find((item) => item.start && item.end && parseInt(item.price) >= 0 && item.type !== '')
    },
    removeItem(index) {
      this.form.dates.splice(index, 1)
      this.form.info.splice(index, 1)
    },
    updateInfo() {
      if(!this.form.dates.length) {
        return
      }
      const basicInfo = {
        date: null,
        start: null,
        end: null,
        price: 0,
        type: ''
      }
      this.form.info.push(basicInfo)
    },
    success(message) {
      this.$buefy.toast.open({
          message: message || 'Submitted successfully',
          position: 'is-top',
          type: 'is-success'
      })
    },
    error(message) {
      this.$buefy.toast.open({
          duration: 5000,
          message,
          position: 'is-top',
          type: 'is-danger'
      })
    }
  }
}
</script>
  