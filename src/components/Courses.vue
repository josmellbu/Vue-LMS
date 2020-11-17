<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Courses</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="nuevo()">Add Courses</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Period</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in list" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ d.Name }}</td>
              <td>{{ d.Period }}</td>
              <td>{{ d.Note }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.book-update-modal
                          @click="editBook(d)">
                      Update
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteBook(d)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Courses',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
    }
  },
  methods: {
    editar(id){
      this.$router.push('/editar/' + id);
    },
    nuevo(){
      this.$router.push('/courses/new');
    },
    getBooks: function() {
      const path = 'http://localhost:8080/cour/courses/';
      axios.get(path)
        .then((res) => {
          this.list = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addBook: function(payload){
      const path = 'http://localhost:8080/cour/courses/';
      console.log(path+payload);
    },
    editBook: function(cad) {
      console.log("edit "+cad+": "+this.message);
    }
  },
  created: function() {
    this.getBooks();
  }
}
</script>


