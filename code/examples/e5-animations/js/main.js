

const observer = new IntersectionObserver(function(entries, observer) {
    
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            console.log("Hello");
            myElem.classList.add("slideInRightAnim");
            observer.unobserve(myElem);
        }
    });

}, {
    rootMargin: "0px 0px -200px 0px"
});

const myElem = document.querySelector("#myElem");
observer.observe(myElem);