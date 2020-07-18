new Vue({
  el: "#app",
  data: {
    products: [
      {
        id: "GRtrNMQOnMY7gBpULUgVY3sQPmV5YPeeeg33629ieJo371FHcPpMwoUFr46R69O3",
        title: "愛心咖啡豆",
        category: "Coffee",
        content: "公益",
        imageUrl:
          "https://images.unsplash.com/photo-1544222322-d340bbd18528?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        enabled: true,
        origin_price: 300,
        price: 200,
        unit: "包",
      },
      {
        id: "Co4FMwbD9520Lg33RLmQdJxUOdQzO3TH0riYb9OLeASXrTyZWdQuWFCl5kDK53t2",
        title: "風味咖啡豆",
        category: "Coffee",
        content: "香草風味",
        imageUrl:
          "https://images.unsplash.com/photo-1559898312-eb45f5aa80fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        enabled: false,
        origin_price: 300,
        price: 300,
        unit: "包",
      },
    ],
    modalTitle: "",
    editingProduct: {},
    creatingProduct: false,
  },
  methods: {
    openModal(action, product, index) {
      switch (action) {
        case "add":
          this.modalTitle = "新增商品";
          this.editingProduct = {};
          this.creatingProduct = true;
          this.editingProduct.id = new Date().getTime();
          $("#productModal").modal("show");
          break;
        case "edit":
          this.modalTitle = "編輯商品";
          this.creatingProduct = false;
          this.editingProduct = Object.assign({}, product);
          this.editingProduct.index = index;
          $("#productModal").modal("show");
          break;
        case "delete":
          this.modalTitle = "刪除商品";
          this.editingProduct = Object.assign({}, product);
          this.editingProduct.index = index;
          $("#delProductModal").modal("show");
          break;
      }
    },
    save() {
      if (this.creatingProduct) {
        this.products.push(this.editingProduct);
      } else {
        this.products[this.editingProduct.index] = this.editingProduct;
      }
      this.editingProduct = {};
      $("#productModal").modal("hide");
    },
    remove() {
      this.products.splice(this.editingProduct.index, 1);
      this.editingProduct = {};
      $("#delProductModal").modal("hide");
    },
  },
});
