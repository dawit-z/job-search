<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrgs"
            :key="organization"
            data-test="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrgs"
              :value="organization"
              :data-test="organization"
              type="checkbox"
              class="mr-3"
              @change="selectOrg"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script setup>
import Accordion from '@/components/Common/Accordion.vue';
import { useUniqueOrgs } from '@/store/composables';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ADD_SELECTED_ORGS } from '@/store/constants';

const store = useStore();
const router = useRouter();

const selectedOrgs = ref([]);
const uniqueOrgs = useUniqueOrgs();

const selectOrg = () => {
  store.commit(ADD_SELECTED_ORGS, selectedOrgs.value);
  router.push({ name: 'JobResults' });
};
</script>
