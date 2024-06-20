// ./cartItems.js
let cartItems = [
  // {
  //   id: "AFEC000459D2DA1",
  //   name: "Nhẫn kim cương",
  //   price: 38050000,
  //   size: "16",
  //   quantity: 1,
  //   image: "https://drive.google.com/thumbnail?id=1rFiq1Pa3hWTTPWLB0Gmf_bfz7Nk6I8Fs&sz=w1000",
  //   description: "Nhẫn kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
  //   code: "AFEC000459D2DA1"
  // },
  {
    id: "AFPB001948F2HA1",
    name: "Dây chuyền nữ kim cương",
    price: 17370000,
    size: "18",
    quantity: 1,
    image: "https://drive.google.com/thumbnail?id=1UPCtFqZnmfmS5a5f1MgNCnUOHDHQl1nr&sz=w1000",
    description: "Mặt dây nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
    code: "AFPB001948F2HA1"
  },
  {
    id: "AFPB001948F8BA1",
    name: "Mặt dây nữ kim cương",
    price: 27790000,
    size: "15",
    quantity: 1,
    image: "https://drive.google.com/thumbnail?id=1_7VHLswiYLmhkXS0DdgK3NIfg8Tyz670&sz=w1000",
    description: "Dây chuyền nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
    code: "AFPB001948F8BA1"
  },
  {
    id: "AFPB213848F8BA1",
    name: "Bông tai nữ quý giá",
    price: 99120000,
    size: "12",
    quantity: 1,
    image: "https://drive.google.com/thumbnail?id=1mCVTk1PoL3Z7IUmM03SRVysQj7BQeDpe&sz=w1000",
    description: "Bông tai với thiết kế bá cháy, đẹp mắt và sang trọng.",
    code: "AFPB001948F8BA1"
  },
];

export const addToCart = (product) => {
  // Check if the product already exists in the cart
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingProductIndex > -1) {
    // If the product exists, increment the quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // If the product does not exist, add it to the cart with quantity 1
    cartItems.push({ ...product, quantity: 1 });
  }
  console.log("Cart Items:", cartItems);
};

export default cartItems;
