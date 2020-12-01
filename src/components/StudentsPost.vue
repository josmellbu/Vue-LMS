<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Students Form</h1>
        <hr><br><br>
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancel</button>
        <br><br>
        ID={{ f.ID }}
        <!--<b-form @submit="onSubmit" @reset="onReset" class="w-100">-->
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group"
                      label="Name:"
                      label-for="form-name-input">
            <b-form-input id="form-name-input"
                          type="text"
                          v-model="f.name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-paternal-group"
                        label="paternal:"
                        label-for="form-paternal-input">
              <b-form-input id="form-paternal-input"
                            type="text"
                            v-model="f.paternal"
                            required
                            placeholder="Enter paternal">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-maternal-group"
                        label="maternal:"
                        label-for="form-maternal-input">
              <b-form-input id="form-maternal-input"
                            type="text"
                            v-model="f.maternal"
                            required
                            placeholder="Enter maternal">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-age-group"
                        label="Age:"
                        label-for="form-age-input">
              <b-form-input id="form-age-input"
                            type="text"
                            v-model="f.age"
                            required
                            placeholder="Enter age">
              </b-form-input>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-button-group>
        </b-form>
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
      f: {
        "ID": "",
        "name": "",
        "paternal": "",
        "maternal": "",
        "age": "",
      }
    }
  },
  components: {
    alert: Alert,
  },
  methods: {

    back: function (){
    this.$router.push("/students")
    },

    create: function (payload) {
      client
        .post("/stu/students", payload)
        .then(() => {
          console.log(payload);
          this.message = "Person added!";
          this.showMessage = true;
          this.$router.push("/students?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },

    initForm: function() {
      this.f.name = "";
      this.f.paternal = "";
      this.f.maternal = "";
      this.f.age = "";
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        name: this.f.name,
        paternal: this.f.paternal,
        maternal: this.f.maternal,
        age: this.f.age,
      };
      if (this.f.ID > 0){
        this.updateStudent(payload, this.f.ID)
      } else {
        this.create(payload)
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },
    getStudentId: function(id) {
      client
        .get(`/stu/students/${id}`)
        .then((res) => {
          this.f = res.data;
        })
        .catch((error) => {
          //this.message = error;
          //this.showMessage = true;
          console.error(error);
        });
    },
    updateStudent: function (payload, id) {
      client
        .put(`/stu/students/${id}`, payload)
        .then(() => {
          console.log(payload);
          this.message = "Person updated!";
          this.showMessage = true;
          this.$router.push("/students?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.error(error);
        });
    },
  },
  created: function(){
    this.f.ID = this.$route.params.id;
    if (this.f.ID>0){
      this.getStudentId(this.f.ID)
      //this.getBooks();
    }
  }, 
}
</script>