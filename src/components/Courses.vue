<template>
  <div class="hello">
    <p>
      {{ list }}
    </p>
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
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Courses',
  data: function() {
    return{
      list: ""
    }
  },
  methods: {
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
      const path = 'http://localhost:5001/books';
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


