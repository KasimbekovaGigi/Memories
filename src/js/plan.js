// Posts
const posts = [];

// Handle the post submission
document.getElementById("postForm").addEventListener("submit", function (event) {
  event.preventDefault();


  const text = document.getElementById("postText").value;
  const imageFile = document.getElementById("postImage").files[0];
  const date = document.getElementById("postDate").value;
  const category = document.getElementById("postCategory").value;


  if (text && imageFile && date && category) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const post = {
        text: text,
        image: reader.result,
        date: date,
        category: category
      };
      posts.push(post);
      displayPosts();
    };
    reader.readAsDataURL(imageFile);
  }
});

function displayPosts() {
  const futureContainer = document.getElementById("futurePostsList");
  const pastContainer = document.getElementById("pastPostsList");


  futureContainer.innerHTML = "";
  pastContainer.innerHTML = "";


  const sortedPosts = posts.sort((a, b) => new Date(a.date) - new Date(b.date));


  sortedPosts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
            <p><strong>Date:</strong> ${new Date(post.date).toLocaleString()}</p>
            <p><strong>Category:</strong> ${post.category === "future" ? "Future/Plans" : "Past/Memories"}</p>
            <p>${post.text}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
        `;
    if (post.category === "future") {
      futureContainer.appendChild(postElement);
    } else {
      pastContainer.appendChild(postElement);
    }
  });
}
