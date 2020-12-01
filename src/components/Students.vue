<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Students</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="nuevo()">Add Students</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" class="text-left">#</th>
              <th scope="col" class="text-left">Name</th>
              <th scope="col" class="text-left">Paternal</th>
              <th scope="col" class="text-left">Maternal</th>
              <th scope="col" class="text-left">Age</th>
              <th scope="col" class="text-left">Opciones</th>
            </tr>
          </thead>
          <tbody class="table-hover">
            <tr v-for="(d, index) in list" :key="index">
              <td class="text-left">{{ d.ID }}</td>
              <td class="text-left">{{ d.name }} - {{ d.ID }}</td>
              <td class="text-left">{{ d.paternal }}</td>
              <td class="text-left">{{ d.maternal }}</td>
              <td class="text-left">{{ d.age }}</td>
              <td class="text-center">
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
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
import Alert from "./Alert.vue";
import client from "../api";

export default {
  name: 'Students',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
    }
  },
  components: {
    alert: Alert,
  },
  methods: {
    editar: function (id){
      this.$router.push('/students/new/' + id);
    },
    nuevo: function () {
      this.$router.push('/students/new');
    },
    getStudents: function() {
      client.get("/stu/students").then((res) => {
          this.list = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onDelete: function (d) {
      var r = confirm("Eliminar ?");
      if (r == true) {
        this.delete(d.ID);
      }
    },
    delete: function (id) {
      client
        .delete(`/stu/students/${id}`)
        .then(() => {
          this.getStudents();
          this.message = "Person removed!";
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getStudents();
        });
    },
  },
  created: function () {
    this.message = this.$route.query.msg;
    //console.log(this.message);
    if (typeof(this.message) !=='undefined') {// || this.message !== null
      this.showMessage = true;
     // this.makeToast("Hecho", this.message, "success");
    }
    this.getStudents();
  },
}
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100);

.table-title h3 {
   color: #fafafa;
   font-size: 20px;
   font-weight: 400;
   font-style:normal;
   font-family: "Roboto", helvetica, arial, sans-serif;
   text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
   text-transform:uppercase;
}
 
th {
  color:#D5DDE5;;
  background:#1b1e24;
  border-bottom:4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size:23px;
  font-weight: 100;
  padding:24px;
  text-align:left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align:middle;
}

th:first-child {
  border-top-left-radius:3px;
}
 
th:last-child {
  border-top-right-radius:3px;
  border-right:none;
}
  
tr {
  border-top: 1px solid #C1C3D1;
  border-bottom: 1px solid #C1C3D1;
  color:#666B85;
  font-size:16px;
  font-weight:normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}
 
tr:hover td {
  background:#4E5066;
  color:#FFFFFF;
  border-top: 1px solid #22262e;
}
 
tr:first-child {
  border-top:none;
}

tr:last-child {
  border-bottom:none;
}
 
tr:nth-child(odd) td {
  background:#EBEBEB;
}
 
tr:nth-child(odd):hover td {
  background:#4E5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius:3px;
}
 
tr:last-child td:last-child {
  border-bottom-right-radius:3px;
}
 
td {
  background:#FFFFFF;
  padding:20px;
  text-align:left;
  vertical-align:middle;
  font-weight:300;
  font-size:18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #C1C3D1;
}

td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}
</style>
