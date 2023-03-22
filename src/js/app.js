window.onload = function() {
  const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetEl = e.target;

    // submenu on desktop devices
    if (window.innerWidth > 768 && isMobile.any()) {
      if (targetEl.classList.contains("menu__arrow")) {
        targetEl.closest(".menu__item").classList.toggle("menu__item_hover")
      }

      if (!targetEl.closest(".menu__item")) {
        const activeMenuItems = document.querySelectorAll(".menu__item_hover");
        if (activeMenuItems.length) {
          for (let i = 0; i < activeMenuItems.length; i++) {
            activeMenuItems[i].classList.remove("menu__item_hover")
          }
        }
      }
    }

    if (window.innerWidth <= 768) {
      if (targetEl.classList.contains("menu__arrow")) {
        targetEl.closest(".menu__item").classList.toggle("menu__item_open")
      }
    }

    // burger menu
    if (targetEl.classList.contains("header__burger")) {
      targetEl.classList.toggle("header__burger_open");
      document.querySelector(".header__nav").classList.toggle("header__nav_open")
      document.body.classList.toggle("body_lock")
    }

    // header search form mobile
    if (targetEl.classList.contains("header__search-icon")) {
      targetEl.nextElementSibling.classList.toggle("header__search-form_open")
    }
    if(!targetEl.closest(".header__search") && document.querySelectorAll(".header__search-form_open").length > 0) {
      document.querySelector(".header__search-form_open").classList.remove("header__search-form_open")
    }

    // Products
    if (targetEl.classList.contains("our-products__more")) {
      if (!targetEl.classList.contains("button_outlined_loading")) {
        targetEl.classList.add("button_outlined_loading");
        setTimeout(() => {
          fetchProducts()
          targetEl.remove()
        }, 2000)
      }
    }

    // Toggle cart
    if (targetEl.closest(".icon-cart")) {
      if (document.querySelectorAll(".cart-product").length) {
        targetEl.closest(".header__actions-item_cart").classList.toggle("header__actions-item_cart_open");
      }
      e.preventDefault()
    } else if (!targetEl.closest(".header__actions-item_cart") && !targetEl.classList.contains("product__actions-button")) {
      document.querySelector(".header__actions-item_cart").classList.remove("header__actions-item_cart_open")
    }
    // Add product to cart 
    if (targetEl.classList.contains("product__actions-button")) {
      if (!targetEl.classList.contains("product__actions-button_hold")) {
        targetEl.classList.add("product__actions-button_hold");
        targetEl.classList.add("product__actions-button_fly");
        addToCart(targetEl);
        e.preventDefault();
      }
    }

    // Delete product from cart 
    if (targetEl.classList.contains("cart-product__delete")) {
      updateCart(targetEl, false)
      e.preventDefault()
    }

    // footer's lists
    if (targetEl.closest(".footer__col_list")) {
      targetEl.closest(".footer__col_list").classList.toggle("footer__col_list_open")
    }

    // form's popup
    if (targetEl.classList.contains("footer__popup-container") || targetEl.classList.contains("footer__popup-close")) {
      targetEl.closest(".footer__popup").classList.remove("footer__popup_open");
      document.body.classList.remove("body_lock")
    }
  
  }

  const form = document.getElementById("footer-form");
  const emailInputEl = form.querySelector(".col-footer__form-input");

  emailInputEl.addEventListener("input", e => {
    if (form.classList.contains("col-footer__form_error")) {
      form.classList.remove("col-footer__form_error")
    }
  })
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const emailValue = e.target.querySelector("input").value;

    if (validateEmail(emailValue)) {
      e.target.reset();
      document.body.classList.add("body_lock");
      document.querySelector(".footer__popup").classList.add("footer__popup_open")
    } else {
      let errorMessageEl = e.target.querySelector(".col-footer__form-error-message");
      if (emailValue.trim === "") { 
        errorMessageEl.innerHTML = "Enter a email"
      } else {
        errorMessageEl.innerHTML = "Email is not valid"
      }
      e.target.classList.add("col-footer__form_error")
    }
  })

  // Main slider
  new Swiper(".main-slider__slider .swiper", {
    // configure Swiper to use modules
    // modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    loopedSlides: 3,
    speed: 300,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  // Room slider
  new Swiper(".rooms__slider .swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    loopedSlides: 3,
    speed: 300,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

    // Tips slider
    new Swiper(".tips__slider .swiper", {
      slidesPerView: 3,
      spaceBetween: 32,
      loop: true,
      speed: 300,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },  
        992: {
          slidesPerView: 3,
          spaceBetween: 32
        }
      }
    })


  // Header
  const headerEl = document.querySelector(".header");

  const callback = function(entries, observer) {
    if (entries[0].isIntersecting) {
      headerEl.classList.remove("header_scroll")
    } else {
      headerEl.classList.add("header_scroll")
    }
  }

  const headerObserver = new IntersectionObserver(callback)
  headerObserver.observe(headerEl)

  // Products
  async function fetchProducts() {
    const response = await fetch("./json/products.json", {
      method: "GET"
    });
    if (response.ok) {
      let result = await response.json()
      loadProducts(result)
    } else {
      console.log("Error!!")
    }
  }

  function loadProducts(data) {
    const products = document.querySelector(".our-products__list");

    data.products.forEach(product => {
      let productTemplateStart = `<div class="our-products__list-item product" data-pid="${product.id}">`
      let productTemplateEnd = `</div>`

      let productImageTemplate = `
        <a class="product__img" href="${product.url}">
          <img src="./images/products/${product.image}" alt="image">
        </a>
      `

      let productBodyTemmplateStart = `
        <div class="product__body">
          <div class="product__name">${product.title}</div>
          <div class="product__desc">${product.text}</div>
      `
      let productBodyTemplateEnd = `</div>`

      let productNewPriceTemplate = `<span class="product__new-price">Rp ${product.price}</span>`
      let productOldPriceTemplate = "";
      if (product.priceOld) {
        productOldPriceTemplate = `<span class="product__old-price">Rp ${product.priceOld}</span>`
      }
      let productPricesTemplate = `<div class="product__price-block">` + productNewPriceTemplate + productOldPriceTemplate + "</div>"

      let productActionsTemplate = `
        <div class="product__actions">
          <div class="product__actions-wrapper">
            <button class="product__actions-button button button_filled_white" type="button">Add to Cart</button>
            <a href="#${product.shareUrl}" class="product__actions-link icon-share">Share</a>
            <a href="#${product.likeUrl}" class="product__actions-link icon-favorite">Like</a>
          </div>
        </div>
      `
      let productBodyTemplate = productBodyTemmplateStart + productPricesTemplate + productActionsTemplate + productBodyTemplateEnd;

      let productLabelsTemplateStart = `<div class="product__labels">`
      let productLabelsTemplateEnd = `</div>`

      let productLabelsTemplateBody = ""

      if (product.labels) {
        for (let i = 0; i < product.labels.length; i++) {
          productLabelsTemplateBody += `<div class="product__label product__label_${product.labels[i].type}">${product.labels[i].value}</div>`
        }
      }

      let productLabelsTemplate = productLabelsTemplateStart + productLabelsTemplateBody + productLabelsTemplateEnd;

      let productTemplate = productTemplateStart + productImageTemplate + productBodyTemplate + productLabelsTemplate + productTemplateEnd;

      products.insertAdjacentHTML("beforeend", productTemplate)
    })
  }

  function addToCart(productButton) {
    const currentProduct = productButton.closest(".our-products__list-item");
    const productImage = currentProduct.querySelector(".product__img img");

    const productImageClone = productImage.cloneNode();

    productImageClone.style.cssText = `
      top: ${productImage.getBoundingClientRect().top}px;
      left: ${productImage.getBoundingClientRect().left}px;
      width: ${productImage.offsetWidth}px;
      height: ${productImage.offsetHeight}px;
    `

    productImageClone.setAttribute("class", "fly-image");

    document.body.append(productImageClone);

    const cart = document.querySelector(".icon-cart");
    const productImageCloneEl = document.querySelector(".fly-image");
    productImageClone.style.cssText = `
      top: ${cart.getBoundingClientRect().top}px;
      left: ${cart.getBoundingClientRect().left}px;
      width: 20px;
      height: 20px;
      opacity: 0.2;
    `

    productImageCloneEl.addEventListener("transitionend", () => {
      if (productButton.classList.contains("product__actions-button_fly")) {
        productButton.classList.remove("product__actions-button_fly");
        console.log("added to cart");
        productImageClone.remove()
        updateCart(productButton)
      }
    })
  }

  function updateCart(productButton, productAdd = true) {
    const cartHeader = document.querySelector(".header__actions-item_cart");
    const cartIcon = cartHeader.querySelector(".icon-cart");
    const cartQuantity = cartIcon.querySelector("span");
    const cartList = cartHeader.querySelector(".header__cart-list");

    if (productAdd) {
      const currentProduct = productButton.closest(".our-products__list-item");
      let cartProduct = cartList.querySelector(`[data-product-id="${currentProduct.dataset.pid}"]`)

      if (cartProduct) {
        const cartProductQuantity = cartProduct.querySelector(".cart-product__quantity span");
        cartProductQuantity.innerHTML = +cartProductQuantity.innerHTML + 1;
      } else {
        const productImage = currentProduct.querySelector("img");
        const productName = currentProduct.querySelector(".product__name");
  
        cartProduct = `
          <li class="cart-product" data-product-id="${currentProduct.dataset.pid}">
            <a href="#" class="cart-product__img"><img src="${productImage.getAttribute("src")}"></a>
            <div class="cart-product__body">
              <a href="#" class="cart-product__name">${productName.innerHTML}</a>
              <div class="cart-product__quantity">Quantity: <span>1</span></div>
              <a href="#" class="cart-product__delete">Delete</a>
            </div>
          </li>
        `
        cartList.insertAdjacentHTML("beforeend", cartProduct);
      }
  
      cartHeader.classList.add("header__actions-item_cart_open")
  
      if (cartQuantity) {
        cartQuantity.innerHTML = +cartQuantity.innerHTML + 1;
      } else {
        cartIcon.insertAdjacentHTML("beforeend", `<span class="quantity">1</span>`)
      }
  
      productButton.classList.remove("product__actions-button_hold")
    } else {
      const cartProduct = productButton.closest(".cart-product");
      const cartProductQuantity = cartProduct.querySelector(".cart-product__quantity span");
  
      if (+cartProductQuantity.innerHTML === 1) {
        cartProduct.remove()
      } else {
        cartProductQuantity.innerHTML = +cartProductQuantity.innerHTML - 1;
      }
  
      if (+cartQuantity.innerHTML == 1) {
        document.querySelector(".header__actions-item_cart").classList.remove("header__actions-item_cart_open")
        cartQuantity.remove()
      } else {
        cartQuantity.innerHTML = +cartQuantity.innerHTML - 1
      }

    }
  
  
  }

  // Furniture

  const furniture = document.querySelector(".furniture__body");
  const furnitureColumns = furniture.querySelectorAll(".furniture__columns")
  const furnitureItems = furniture.querySelector(".furniture__items")

  let coordXPercent = 0;

  if (furniture && !isMobile.any()) {
    const speed = 0.01;

    function setGalleryPosition() {
      let furnitureItemsWidth = 0;

      furnitureColumns.forEach(element => furnitureItemsWidth += element.offsetWidth);

      const furnitureDiff = furnitureItemsWidth - furniture.offsetWidth;
      let position = furnitureDiff / 2 * coordXPercent;

      furnitureItems.style.cssText = `transform: translate3d(${-position}px, 0, 0)`

      if (coordXPercent < 1) {
        requestAnimationFrame(setGalleryPosition);
      } else {
        furniture.classList.remove("_init")
      }

    }

    furniture.addEventListener("mousemove", e => {
      const furnitureWidth = furniture.offsetWidth;

      let coordX = e.pageX - furnitureWidth / 2;

      coordXPercent = coordX / furnitureWidth * 2;

      if (!furniture.classList.contains("_init")) {
        requestAnimationFrame(setGalleryPosition);
        furniture.classList.add("_init")
      }
    })
 }
}