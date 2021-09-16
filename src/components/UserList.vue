<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <router-link
        :to="'/add/'"
        class="btn  mr-3 btn-success"
        >Add new user</router-link
      >

        <input
          type="text"
          class="form-control"
          placeholder="Search by name"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      

      <h4>User List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.id }} - {{ user.name }}
        </li>
      </ul>

      <!-- 
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button>
       -->
    </div>
    <div class="col-md-6">
      <div v-if="currentUser">
        <h4>User Details</h4>
        <div>
          <img :src="currentUser.avatar" class="img-fluid" alt="avatar image" />
        </div>
        <div>
          <label><strong>ID:</strong></label> {{ currentUser.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentUser.name }}
        </div>
        <div>
          <label><strong>Job:</strong></label> {{ currentUser.job }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentUser.activated ? "Activated" : "Locked" }}
        </div>

        <router-link
          :to="'/users/' + currentUser.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveUsers() {
      DataService.getAll()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = user ? index : -1;
    },

    /* removeAllUsers() {
      DataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
 */



    searchName() {
      DataService.findByName(this.name)
        .then((response) => {
          this.users = response.data;
          this.setActiveUser(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUsers();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
