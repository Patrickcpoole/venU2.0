<template>
  <q-item
    clickable
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" :color="$route.path === link ? 'primary': 'white'"/>
    </q-item-section>

    <q-item-section>
      <q-item-label :style="$route.path === link ? 'color:#34887b': 'color:white'" >{{ title }}</q-item-label>
      <q-item-label caption >
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import router from "src/router";

export default {
  name: 'EssentialLink',


  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
