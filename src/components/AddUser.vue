<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="user.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="job">Job</label>
        <input
          class="form-control"
          id="job"
          required
          v-model="user.job"
          name="job"
        />
      </div>

      <div class="form-check mb-3">
        <input
          class="form-check-input"
          type="checkbox"
          :checked="checked"
          v-model="user.activated"
          id="activated"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Activated : {{ user.activated }}
        </label>
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
/* Vue Pagination with Axios and API (Server Side pagination) example: https://www.bezkoder.com/vue-pagination-axios/*/

import DataService from "../services/DataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: "",
        job: "",
        activated: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      var data = {
        name: this.user.name,
        job: this.user.job,
        activated: this.user.activated,
      };

      DataService.create(data)
        .then((response) => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
