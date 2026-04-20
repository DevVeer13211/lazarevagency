const locomotive = () => {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
    lerp: 0.0111,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true },
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    // follwoing line is not required to work pinning on touch screen

    /* pinType: document.querySelector("main").style.transform
    ? "transform"
    : "fixed"*/
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
};

const loadingAnimations = () => {
  const timeline = gsap.timeline();

  gsap.from("#page1", {
    transform: "scale(0.3,0.1)",
    borderRadius: "100px",
    duration: 1,
    ease: "circ.out",
  });

  gsap.from("nav", {
    opacity: 0,
    delay:0.9,
  });

   const headingOne = document.querySelector("#page1>h1:nth-child(1)");
  const hOneText = headingOne.innerText;
  const hOneSplittedText = hOneText.split("");
  headingOne.innerHTML = "";
  console.log(hOneSplittedText);
  hOneSplittedText.forEach((e) => {
    headingOne.innerHTML += `<span>${e}</span>`;
  });

  const headingTwo = document.querySelector("#page1>h1:nth-child(2)");
  const hTwoText = headingTwo.innerText;
  headingTwo.innerHTML = "";

  const hTwoSplittedText = hTwoText.split("");
  hTwoSplittedText.forEach((e) => {
    headingTwo.innerHTML += `<span>${e}</span>`;
  });
  console.log(hTwoSplittedText);

  gsap.from("#page1 h1 span", {
    y: 100,
    opacity: 0,
    transform: "rotateX(45)",
    stagger: 0.0234,
    duration:.5,
    delay:1.2,
  });

  gsap.from("#page1 p, h3, img", {
    opacity: 0,
    duration:1,
    delay:1.5,

  });
 
};

const navAnimation = () => {
  const timeline = gsap.timeline();

  const navBar = document.querySelector("nav");
  const bottomNav = document.querySelector("#nav-bottom");
  const bottomNavElements = document.querySelectorAll(".inside-bottom>h2>span");

  navBar.addEventListener("mouseenter", () => {
    timeline.to(bottomNav, {
      bottom: "-250%",
      ease: "power3.out",
    });
    timeline.to(bottomNavElements, {
      opacity: 1,
      y: 0,
      ease: "circ.out",
      stagger: {
        amount: 0.5,
      },
    });
  });

  navBar.addEventListener("mouseleave", () => {
    timeline.to(bottomNavElements, {
      opacity: 0,
      y: 25,
      ease: "circ.out",
      stagger: {
        amount: 0.5,
      },
    });

    timeline.to(bottomNav, {
      bottom: 0,
      ease: "circ.out",
    });
  });
};

const hoveringElement = () => {
  const hoverElement = document.querySelectorAll(".pageRightElem");

  hoverElement.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      gsap.to(elem.childNodes[5], {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
      });
    });
    elem.addEventListener("mouseleave", () => {
      gsap.to(elem.childNodes[5], {
        opacity: 0,
        scale: 0,
        ease: "power1.out",
      });
    });

    elem.addEventListener("mousemove", (item) => {
      gsap.to(elem.childNodes[5], {
        x: item.x - elem.getBoundingClientRect().x - 50,
        y: item.y - elem.getBoundingClientRect().y - 150,
        ease: "power3.out",
      });
    });
  });
};

const page3Animation = () => {
  const playIcon = document.querySelector(".play-icon");
  const watchShow = document.querySelector(".view");
  const page3video = document.querySelector("#page3 video");

  playIcon.addEventListener("mouseenter", () => {
    gsap.to(watchShow, {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "expo.out",
    });
  });

  playIcon.addEventListener("mouseleave", () => {
    gsap.to(watchShow, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "expo.out",
    });
  });

  playIcon.addEventListener("click", () => {
    page3video.play();
    gsap.to(page3video, {
      scale: 1,
      opacity: 1,
      ease: "power2.out",
    });
  });

  page3video.addEventListener("click", () => {
    page3video.pause();
    gsap.to(page3video, {
      scale: 0,
      opacity: 0,
      ease: "circ.out",
    });
  });
};

const page5Animations = () => {
  const page5Video = document.querySelectorAll(".wholeSectionRight>video");

  page5Video.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      e.play();
    });
    e.addEventListener("mouseleave", () => {
      e.pause();
      e.currentTime = 0;
      e.load();
    });
  });
};

const page7Animations = () => {
  gsap.from(".effectElem", {
    x: 0,
    duration: 2,
    stagger: {
      amount: 0.1,
    },
    scrollTrigger: {
      trigger: ".effectElem",
      scroller: "main",
      start: "top 60%",
      end: "top 130%",
      scrub: 3,
    },
  });
};

locomotive();
loadingAnimations();
navAnimation();
hoveringElement();
page3Animation();
page5Animations();
page7Animations();
