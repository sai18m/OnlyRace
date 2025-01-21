document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    var resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = ''; 
  
    var pages = ['index.html', 'vid1.html', 'vid2.html', 'vid3.html', 'vid4.html', 'vid5.html', 'vid6.html'];
    var resultsFound = false;
    var pagesProcessed = 0;
    pages.forEach(function(page, pageIndex) {
      fetch(page)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, 'text/html');
          var sections = doc.querySelectorAll('h1, h2, h3, h4, h5, p, i, b');
  
          var pageResultsFound = false;
  
          sections.forEach(function(section, index) {
            if (section.textContent.toLowerCase().includes(searchTerm)) {
              resultsFound = true;
              pageResultsFound = true;
              if (!section.id) {
                section.id = 'section-' + pageIndex + '-' + index + '-' + Math.random().toString(36).substr(2, 9);
              }
  
              var listItem = document.createElement('li');
              listItem.textContent = section.textContent;
              listItem.addEventListener('click', function() {
                window.location.href = page + '#' + section.id;
                setTimeout(function() {
                  var targetElement = document.getElementById(section.id);
                  if (targetElement) {
                    var elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    var elementHeight = targetElement.offsetHeight;
                    var viewportHeight = window.innerHeight;
                    var scrollPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);
  
                    window.scrollTo({
                      top: scrollPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              });
              resultsList.appendChild(listItem);
            }
          });
  
          pagesProcessed++;
          if (pagesProcessed === pages.length && !resultsFound) {
            var noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'No results found';
            resultsList.appendChild(noResultsItem);
          }
        })
        .catch(error => {
          console.error('Error fetching page:', page, error);
          pagesProcessed++;
          if (pagesProcessed === pages.length && !resultsFound) {
            var noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'No results found';
            resultsList.appendChild(noResultsItem);
          }
        });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll("video");
  
  
    function playVideos() {
        videos.forEach(function(video) {
            var rect = video.getBoundingClientRect();
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            var isInCenter = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= viewportHeight &&
                rect.right <= viewportWidth &&
                rect.top <= (viewportHeight / 2) && 
                rect.bottom >= (viewportHeight / 2)
            );
  
            if (isInCenter) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
  
    window.addEventListener('scroll', playVideos);
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll('.fullscreen-video');
  
    videos.forEach(function(video) {
        video.onclick = function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        };
    });
  });
  
  
  
    function toggleDisplay() {
      console.log("Function called");                                    
      var element = document.getElementById("myElement");
      if (element.style.display === "none") {
        element.style.display = "block";                                    
      } else {
        element.style.display = "none";                                    
      }
    }
  
      
    
      function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
  
      window.onload = function() {
        if (!isMobileDevice()) {
          window.location.replace("https://offline-dino-game.firebaseapp.com/");
        }
      };
      
  
  
    