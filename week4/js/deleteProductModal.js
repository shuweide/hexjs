Vue.component("deleteProductModal", {
  template: `<div
            class="modal fade"
            id="deleteProductModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            >
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">刪除商品</h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true" class="text-white">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ editingProduct.title }}</strong>
                商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                >
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="remove">
                    確認刪除
                </button>
                </div>
            </div>
            </div>
        </div>`,
  data() {
    return {};
  },
  props: ["editingProduct", "user"],
  methods: {
    remove() {
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.editingProduct.id}`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
      $("#deleteProductModal").modal("hide");
      this.$emit("update");
      axios
        .delete(url)
        .then(() => {
          $("#deleteProductModal").modal("hide");
          this.$emit("update");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
