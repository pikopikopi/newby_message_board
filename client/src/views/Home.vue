<template>
  <div>
    <form @submit.prevent="addMessage">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="subject"
        placeholder="Enter a subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input v-model="message.imageURL" type="url" class="form-control" id="imageURL"
        placeholder="Put an image URL">
      </div>
      <button type="submit" class="btn btn-primary">Add message</button>
    </form>
    <div class="list-unstyled" v-for="message in messages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:8080/messages';
export default {
  name: 'home',
  data: () => ({
    messages: [],
    message: {
      username: 'Anoymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  mounted() {
    fetch(API_URL).then(response => response.json()).then((result) => {
      this.messages = result;
    });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.strigify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then(response => response.json()).then((result) => {
        this.messages = result;
      });
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid white;
}

img {
  max-width: 300px;
  height: auto;
}
</style>
