<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User Details</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentUser.name"
        />
      </div>
      <div class="form-group">
        <label for="job">Job</label>
        <input type="text" class="form-control" id="job"
          v-model="currentUser.job"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentUser.activated ? "Activated" : "Locked" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentUser.activated"
      @click="updateActivated(false)"
    >
      Lock
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateActivated(true)"
    >
      Activate
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateUser"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      DataService.get(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateActivated(status) {
      var data = {
        id: this.currentUser.id,
        name: this.currentUser.name,
        job: this.currentUser.job,
        activated: status
      };

      DataService.update(this.currentUser.id, data)
        .then(response => {
          console.log(response.data);
          this.currentUser.activated = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateUser() {
      DataService.update(this.currentUser.id, this.currentUser)
        .then(response => {
          console.log(response.data);
          this.message = 'The user was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteUser() {
      DataService.delete(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>