<script setup lang="ts">
import { ref, h, defineComponent } from 'vue'
import json from './index.json'

const getItems = (items: any[]) => {
  return h(
    'ul',
    items.map((item) => {
      if (item.items != undefined) {
        return h('li', [item.text, getItems(item.items)])
      } else {
        return h('li', h('a', { href: item.link }, item.text))
      }
    })
  )
}

const ListComponent = defineComponent({
  name: 'ListComponent',
  setup() {
    return () => h('nav', { class: 'table-of-contents' }, getItems(json))
  }
})
</script>

<ListComponent />