new Vue({
  el: "#app",
  data: {
    products: [],
    pagination: {},
    user: {
      token: "",
      uuid: "eba36ec6-e25f-43ea-aedf-38efe6893706",
    },
    editingProduct: {},
    creatingProduct: false,
  },
  methods: {
    getProducts(page = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((response) => {
        console.log(response);
        this.products = response.data.data;
        this.pagination = response.data.meta.pagination;
      });
    },
    openModal(action, product, index) {
      switch (action) {
        case "add":
          //利用$refs操作元件內的data
          this.$refs.productModal.editingProduct = {
            imageUrl: [],
          };
          this.creatingProduct = true;
          $("#productModal").modal("show");
          break;
        case "edit":
          this.editingProduct = Object.assign({}, product);
          this.$refs.productModal.get(this.editingProduct.id);
          this.creatingProduct = false;
          break;
        case "delete":
          this.editingProduct = Object.assign({}, product);
          $("#deleteProductModal").modal("show");
          break;
      }
    },
  },
  created() {
    this.user.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!!!this.user.token) {
      window.location = "login.html";
    }
    this.getProducts();
  },
});
