const app = {
  data: {
    uuid: "eba36ec6-e25f-43ea-aedf-38efe6893706",
    host: "https://course-ec-api.hexschool.io/",
    products: [],
  },
  get() {
    const vm = this;
    const url = `${vm.data.host}api/${vm.data.uuid}/ec/products`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        vm.data.products = res.data.data;
        vm.render(res);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  render() {
    const products = document.querySelector(".products");

    let temp = "";
    this.data.products.forEach((product) => {
      console.log(product);
      temp += `
          <li class="product card bg-light">
            <img src="${product.imageUrl}" class="card-img-top">
            <div class="card-body">
                <h3 class="card-title">${product.title}</h3>
                <p class="card-text">${product.content}</p>
            </div>
          </li>`;
    });
    products.innerHTML = temp;
  },
};
app.get();
