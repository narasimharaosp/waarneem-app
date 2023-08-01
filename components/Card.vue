<template>
  <div class="column">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <h1 class="column title is-10">
              {{ data.title }}
            </h1>
            <div class="column icons">
              <a aria-disabled="true">
                <b-icon :icon="'pencil'" />
              </a>
              <a @click="$emit('deleteShift', data)" >
                <b-icon :icon="'delete'"/>
              </a>
            </div>
          </div>
          <p class="has-text-grey">
            {{ data.description }}
          </p>
          <h1>Dates</h1>
          <div class="box columns m-4 p-0 has-shadow has-background-grey-dark has-text-white" v-for="info in data.info" :key="info.type">
              <div class="column">
                {{ _getFormattedDate(info.date) }}
              </div>
              <div class="column">
                {{ _getFormattedDate(info.start, 'HH:mm') }}
              </div>
              <div class="column">
                {{ _getFormattedDate(info.end, 'HH:mm') }}
              </div>
              <div class="column">
                {{ info.type }}
              </div>
              <div class="column">
                {{ info.price }}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFormattedDate } from '../utils';
export default {
  name: 'BuefyCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    _getFormattedDate: getFormattedDate
  }
}
</script>
<style type="scss">
.icons {
  display: flex;
  justify-content: right;
  a {
    color: #4a4a4a;
    &:hover{
      color: grey;
    }
  }
}
</style>