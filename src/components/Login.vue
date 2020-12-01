<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 alex">
        <h1>Login Form</h1>
        <hr />
        <br /><br />
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancel</button>
        <br /><br />
        <div class="card ">
          <div class="card-header text-center">
            <h3>Iniciar sesión</h3>
          </div>
          <div class="card-body">
            <form @submit="onSubmit" @reset="onReset">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="email" class="form-control" v-model="d.username" placeholder="usuario">
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control" placeholder="contraseña" v-model="d.password">
              </div>
              <div class="form-group">
                <input type="submit" value="Iniciar sesión" class="btn btn-block login_btn">
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              ¿No tienes una cuenta?<a href="#">Regístrate</a>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import client from "../api";
export default {
  name: "LoginForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    
  },
  methods: {
    makeToast: function (titulo, texto, tipo) {
      this.toastCount++;
      this.$bvToast.toast(texto, {
        title: titulo,
        variant: tipo,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    back: function () {
      this.$router.push("/");
    },
    login: function (payload) {
      client
        .post("/us/login", payload)
        .then((res) => {
          console.log(payload);
          // console.log('set');
          let credentials = {
            "token":res.data.token,
            "user":res.data,
          };
          //console.log(credentials.token);
          localStorage.setItem("user", JSON.stringify(credentials));
          //console.log('get');
          //let user = JSON.parse(localStorage.getItem("user"));
          //if (user != null) {
          //  console.log(user.token);
          //}
          this.message = "Login success!";
          this.showMessage = true;
          this.makeToast("Hecho", "Login ok", "success");
          //this.$router.push("/persons");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      this.d.username = "";
      this.d.password = "";
    },
    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        email: this.d.username,
        password: this.d.password,
      };
      this.login(payload);
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },
  },
  created: function () {
    this.d.ID = this.$route.params.id;
    if (this.d.ID > 0) {
      this.getById(this.d.ID);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.alexs{
  display: flex;
  align-items: center;
  justify-content: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  color: #42b983;
}
.card{
height: auto;
margin: auto;
width: 350px;
background-color: rgba(0,0,0,0.5);
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #C82333;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #C82333;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #C82333;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}
</style>