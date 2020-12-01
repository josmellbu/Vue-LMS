<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Courses Form</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancel</button>
        <br><br>
        ID={{ f.ID }}
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
          <b-form-group id="form-period-group"
                        label="Period:"
                        label-for="form-period-input">
              <b-form-input id="form-period-input"
                            type="text"
                            v-model="f.period"
                            required
                            placeholder="Enter period">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-note-group"
                        label="Note:"
                        label-for="form-note-input">
              <b-form-input id="form-note-input"
                            type="text"
                            v-model="f.note"
                            required
                            placeholder="Enter note">
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
import axios from 'axios';

export default {
  name: 'Courses',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
      f: {
        "name": "",
        "period": "",
        "note": "",
      }
    }
  },
  methods: {

    back: function (){
    this.$router.push("/courses")
    },

    create: function (payload) {
      const path = 'http://localhost:8080/cour/courses/';
      axios.post(path, payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/courses")

          this.message = 'Courses added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    initForm: function() {
      this.f.name = "";
      this.f.period = "";
      this.f.note = "";
    },
    onSubmit: function(evt) {
      evt.preventDefault();
      const payload = {
        name: this.f.name,
        period: this.f.period,
        note: this.f.note,
      };
      if (this.f.ID > 0){
        this.updateCourses(payload, this.f.ID)
      } else {
        this.create(payload)
      }
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.initForm();
    },
    getCoursesId: function(id) {
      const path = 'http://localhost:8080/cour/courses/'+id;
      axios.get(path)
        .then((res) => {
          this.f = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    updateCourses: function (payload, id) {
      const path = `http://localhost:8080/cour/courses/${id}`;
      axios.put(path, payload).then(() => {
          console.log(payload);
          this.$router.push("/courses")
          this.message = 'Courses updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created: function(){
    this.f.ID = this.$route.params.id;
    if (this.f.ID>0){
      this.getCoursesId(this.f.ID)
      //this.getBooks();
    }
  },
}
</script>