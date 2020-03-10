<template>
  <div class="home d-flex align-items-center justify-content-center h-full position-relative">

    <div style="position: absolute; width: 100%; top: 0; left: 0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1440 320"><path fill="#3742fa" fill-opacity="1" d="M0,224L80,192C160,160,320,96,480,69.3C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    </div>

    <div class="row" style="width: 100%; margin-top: -5vh">
      <div class="col-lg-6 col-md-8 col-11 mx-auto">
        <h1 class="text-title mb-3">Url Shortener</h1>            
        <b-input-group>
          <input class="form-control" v-model="url" id="url" type="url" placeholder="Input url. ex: anggamanggala.com" v-on:keyup.enter="generateUrl"/>
          <b-input-group-append>          
            <b-button @click="generateUrl" variant="outline-primary"><b-icon-arrow-right></b-icon-arrow-right></b-button>
          </b-input-group-append>
        </b-input-group>
        <p v-if="$store.state.isLoading" class="text-primary mt-3">Loading ...</p>
        <p class="px-3 py-2 mt-3 bg-white result_url" style="border: 1px solid blue; overflow-x: auto" v-if="$store.state.resultUrl && $store.state.isLoading == false">{{ $store.state.resultUrl }}</p>
        <p class="px-3 py-2 mt-3 bg-white result_url" style="border: 1px solid red; overflow-x: auto" v-if="$store.state.error && $store.state.isLoading == false">{{ $store.state.error }}</p>
      </div>
    </div>

    <div style="position: absolute; width: 100%; bottom: 0; left: 0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -65 1440 320"><path fill="#3742fa" fill-opacity="1" d="M0,256L80,234.7C160,213,320,171,480,170.7C640,171,800,213,960,197.3C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      url: '',      
    }
  },
  methods: {
    generateUrl() {
      this.isLoading = true
      this.$store.dispatch('generateUrl', this.url)
      .then(() => {
        this.isLoading = false
        console.log('Success')
      })
    }
  }
}
</script>
<style>
.home {
  font-family: 'Montserrat', sans-serif !important;
}
.h-full {
  height: 100vh;
}
.text-title {
  font-size: 28px;
  font-weight:600;
}
.result_url{
  border-radius: 5px;
}
</style>
