<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Courses</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="novo()">Add Courses</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Periodo</th>
              <th scope="col">Nota</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in list" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ d.name }}</td>
              <td>{{ d.period }}</td>
              <td>{{ d.note }}</td>
              <td class="text-center">
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          v-b-modal.book-update-modal
                          @click="editar(d.ID)">
                      Update
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDelete(d)">
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
      this.$router.push('/courses/new/' + id);
    },
    novo: function(){
      this.$router.push('/courses/new');
    },
    getCourses: function() {
      const path = 'http://localhost:8080/cour/courses/';
      axios.get(path).then((res) => {
          this.list = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onDelete: function (d) {
      this.delete(d.ID);
    },
    delete: function (id) {
      const path = `http://localhost:8080/cour/courses/${id}`;
      axios.delete(path)
        .then(() => {
          this.getCourses();
          this.message = "Course removed!";
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getCourses();
        });
    },
  },
  created: function() {
    this.getCourses();
  }
}
</script>


