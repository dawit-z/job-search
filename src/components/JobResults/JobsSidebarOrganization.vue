<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in UNIQUE_ORGANIZATIONS"
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
              @change="selectOrganization"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import Accordion from '@/components/Common/Accordion.vue';
import { UNIQUE_ORGANIZATIONS, ADD_SELECTED_ORGS } from '@/store/constants';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'JobsSidebarOrganization',
  components: { Accordion },
  data: () => ({
    selectedOrgs: [],
  }),
  computed: {
    ...mapGetters([UNIQUE_ORGANIZATIONS]),
  },
  methods: {
    ...mapMutations([ADD_SELECTED_ORGS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGS(this.selectedOrgs);
      this.$router.push({ name: 'JobResults' });
    },
  },
};
</script>
