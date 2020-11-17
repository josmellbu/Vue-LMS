<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Courses Form</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancel</button>
        <br><br>

        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group"
                      label="Name:"
                      label-for="form-name-input">
            <b-form-input id="form-name-input"
                          type="text"
                          v-model="f.Name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-period-group"
                        label="Period:"
                        label-for="form-period-input">
              <b-form-input id="form-period-input"
                            type="text"
                            v-model="f.Period"
                            required
                            placeholder="Enter period">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-note-group"
                        label="Note:"
                        label-for="form-note-input">
              <b-form-input id="form-note-input"
                            type="text"
                            v-model="f.Note"
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
        "Name": "",
        "Period": "",
        "Note": "",
      }
    }
  },
  methods: {
    addBook(payload) {
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
    initForm() {
      this.f.Name = '';
      this.f.Period = '';
      this.f.Note = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      const payload = {
        name: this.f.Name,
        period: this.f.Period,
        note: this.f.Note,
      };
      this.addBook(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.initForm();
    },
  },
  created: function(){
    //this.getBooks();
  },
}
</script>