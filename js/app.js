// Event listener for form submit
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // Prevent form from submitting
    e.preventDefault();

    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        const bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local storage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    myForm.reset();

    // Save Alert
    swal({
        title: "Saved!",
        text: "Saved successfully!",
        icon: "success",
        button: "Ok",
    });

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Delete Bookmark
function deleteBookmark(url) {
    // Get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    fetchBookmarks();

    // Delete Alert
    swal({
        title: "Delete!",
        text: "Deleted Bookmark!",
        icon: "success",
        button: "Ok",
    });
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output ID
    let bookmarkResults = document.getElementById('bookmarkResults');

    // Build output
    bookmarkResults.innerHTML = '';

    for (i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarkResults.innerHTML += `
            <div class="card card-body bg-light mb-2">
                <h3>
                    ${name} 
                    
                    <a onclick="deleteBookmark('${url}')" class="btn btn-danger  float-right ml-2" href="#">
                    Delete</a>

                    <a class="btn btn-success float-right" target="_blank" href="${url}">
                    Visit</a>
                </h3>
            </div>
        `;
    }
}

// Form Validation
function validateForm(siteName, siteUrl) {
    // Check empty form
    if (!siteName && !siteUrl) {

        swal({
            title: "Alert!",
            text: "Please fill in the form!",
            icon: "warning",
            button: "Ok",
        });

        return false;
    }

    // Check Valid URL
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        swal({
            title: "Alert!",
            text: "Please use a valid URL!",
            icon: "warning",
            button: "Ok",
        });

        return false;
    }

    return true;
}