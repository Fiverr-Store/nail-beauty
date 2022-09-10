(function () {
	window.onload = function () {
		window.setTimeout(fadeout, 0);
	};
  function fadeout() {
		document.querySelector(".page-loader").style.opacity = "0";
		document.querySelector(".page-loader").style.display = "none";
	}
	window.onscroll = function () {
		var header_navbar = document.querySelector(".navbar-area");
		var sticky = header_navbar.offsetTop;
		if (window.pageYOffset > sticky) {
			header_navbar.classList.add("sticky");
		} else {
			header_navbar.classList.remove("sticky");
		}
		var backToTo = document.querySelector(".scroll-top");
		if (
			document.body.scrollTop > 50 ||
			document.documentElement.scrollTop > 50
		) {
			backToTo.style.display = "flex";
		} else {
			backToTo.style.display = "none";
		}
	};

	var pageLink = document.querySelectorAll(".page-scroll");
	pageLink.forEach((elem) => {
		elem.addEventListener("click", (e) => {
			e.preventDefault();
			document
				.querySelector(elem.getAttribute("href"))
				.scrollIntoView({ behavior: "smooth", offsetTop: 1 - 60 });
		});
	});
	function onScroll(event) {
		var sections = document.querySelectorAll(".page-scroll");
		var scrollPos =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;
		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute("href");
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (
				refElement.offsetTop <= scrollTopMinus &&
				refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
			) {
				document
					.querySelector(".page-scroll")
					.classList.remove("active");
				currLink.classList.add("active");
			} else {
				currLink.classList.remove("active");
			}
		}
	}
	window.document.addEventListener("scroll", onScroll);
	let navbarToggler = document.querySelector(".navbar-toggler");
	var navbarCollapse = document.querySelector(".navbar-collapse");
	document.querySelectorAll(".page-scroll").forEach((e) =>
		e.addEventListener("click", () => {
			navbarToggler.classList.remove("active");
			navbarCollapse.classList.remove("show");
		})
	);
	navbarToggler.addEventListener("click", function () {
		navbarToggler.classList.toggle("active");
	});


 //===== text-blink

 class TypeWritter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Type Method
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt
      }<span class="blinking-cursor">|</span></span>`;

    // Initial type Speed
    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM  Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWritter
  new TypeWritter(txtElement, words, wait);
}




})();
