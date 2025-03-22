/*--------------------
Vars
--------------------*/
let progress = 30;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

(function () {
  emailjs.init("Gab29OES9fs0AXitx");
})();

function sendRomanticEmail(response) {
  let message = "";

  if (response === "Yes") {
    message = "She said YES! 🎉❤️";
  } else if (response === "No") {
    message = "She said Not Intrested 😔💔";
  } else {
    message = "She said Not Intrested 😔💔";
  }

  const templateParams = {
    to_name: "Sudais Khan",
    from_name: "Pam",
    message: response,
  };

  emailjs.send("service_yj5nxik", "template_nhlkhgb", templateParams).then(
    function (response) {
      console.log("Email sent successfully!", response.status, response.text);
      alert(`Your response has been sent to Sudais 💌\nMessage: ${message}`);
    },
    function (error) {
      console.error("Failed to send email:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  );
}

if (window.innerWidth <= 768) {
  document.removeEventListener("mousewheel", handleWheel);
  document.removeEventListener("mousedown", handleMouseDown);
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);
