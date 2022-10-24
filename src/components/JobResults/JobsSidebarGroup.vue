<template>
  <Accordion :header="header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
            <input
              :id="value"
              v-model="selectedValues"
              :value="value"
              :data-test="value"
              type="checkbox"
              class="mr-3"
              @change="selectValue"
            />
            <label :for="value" data-test="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script setup>
import Accordion from '@/components/Common/Accordion.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { defineProps, ref } from 'vue';

const store = useStore();
const router = useRouter();

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: Set,
    required: true,
  },
  mutation: {
    type: String,
    required: true,
  },
});

const selectedValues = ref([]);

const selectValue = () => {
  store.commit(props.mutation, selectedValues.value);
  router.push({ name: 'JobResults' });
};
</script>
