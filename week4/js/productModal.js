Vue.component("productModal", {
  template: `<div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="creatingProduct">新增商品</span>
            <span v-else>編輯商品</span>
          </h5>
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
          <div class="row">
            <div class="col-sm-4">
            <div v-for="i in 5" :key="i + 'img'" class="form-group">
              <label :for="'img' + i">圖片網址</label>
              <input :id="'img' + i" v-model="editingProduct.imageUrl[i - 1]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <img class="img-fluid" :src="editingProduct.imageUrl[0]" alt />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  id="title"
                  v-model="editingProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    id="category"
                    v-model="editingProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input
                    id="unit"
                    v-model="editingProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    id="origin_price"
                    v-model="editingProduct.origin_price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    id="price"
                    v-model="editingProduct.price"
                    type="number"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea
                  id="description"
                  v-model="editingProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea
                  id="content"
                  v-model="editingProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="enabled"
                    v-model="editingProduct.enabled"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="save">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      editingProduct: {
        imageUrl: [],
      },
    };
  },
  props: ["creatingProduct", "user"],
  methods: {
    get(id) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
      axios
        .get(api)
        .then((res) => {
          $("#productModal").modal("show");
          this.editingProduct = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    save() {
      //新增商品
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
      let httpMethod = "post";
    
      if (!this.creatingProduct) {
        api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.editingProduct.id}`;
        httpMethod = 'patch';
      }

      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
      axios[httpMethod](api, this.editingProduct)
        .then(() => {
          $("#productModal").modal("hide");
          this.$emit("update");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
});
