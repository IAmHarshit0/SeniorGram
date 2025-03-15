// SeniorGram - JavaScript for senior-friendly social media app

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load sample posts when the page loads
    loadSamplePosts();
    
    // Set up event listeners
    setupEventListeners();

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Function to set up all event listeners
function setupEventListeners() {
    // Photo upload button
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    if (uploadPhotoBtn) {
        uploadPhotoBtn.addEventListener('click', function() {
            // In a real app, this would open a file picker
            // For this demo, we'll show a simple message
            alert('This would open your photo gallery. For this demo, we\'ll add a sample post instead.');
            
            // Add a new post to demonstrate functionality
            addNewPost({
                userName: 'You',
                userPhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                postText: document.querySelector('textarea').value || 'My new photo!',
                postImage: 'https://marketplace.canva.com/EAF-43gIi8Q/2/0/1600w/canva-brown-photo-collage-instagram-post-JNn9YFKSqNY.jpg',
                likes: 0,
                comments: []
            });
            
            // Clear the textarea
            document.querySelector('textarea').value = '';
        });
    }
}

// Function to load sample posts
function loadSamplePosts() {
    const samplePosts = [
        {
            userName: 'Margaret Johnson',
            userPhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            postText: 'My grandchildren came to visit this weekend. We had such a wonderful time baking cookies together!',
            postImage: 'https://marketplace.canva.com/EAF-43gIi8Q/2/0/1600w/canva-brown-photo-collage-instagram-post-JNn9YFKSqNY.jpg',
            likes: 24,
            comments: [
                { user: 'Robert Smith', text: 'They look like they had a great time! My grandkids are visiting next month.' },
                { user: 'Susan Williams', text: 'What kind of cookies did you make? They look delicious!' }
            ]
        },
        {
            userName: 'Thomas Anderson',
            userPhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            postText: 'Took a lovely walk in the park today. The flowers are blooming beautifully this spring!',
            postImage: 'https://marketplace.canva.com/EAF-43gIi8Q/2/0/1600w/canva-brown-photo-collage-instagram-post-JNn9YFKSqNY.jpg',
            likes: 18,
            comments: [
                { user: 'Patricia Davis', text: 'The park looks beautiful! I should visit there soon.' }
            ]
        }
    ];
    
    // Add each sample post to the feed
    samplePosts.forEach(post => addNewPost(post));
}

// Function to add a new post to the feed
function addNewPost(post) {
    const postsFeed = document.getElementById('postsFeed');
    if (!postsFeed) return;
    
    // Create post element
    const postElement = document.createElement('div');
    postElement.className = 'bg-gray-600 p-4 rounded-lg shadow-lg post';
    
    // Create post HTML structure
    postElement.innerHTML = `
        <div class="flex items-center mb-4">
            <img src="${post.userPhoto}" alt="${post.userName}" class="w-12 h-12 rounded-full mr-4">
            <div class="text-xl font-bold">${post.userName}</div>
        </div>
        <p class="text-xl mb-4">${post.postText}</p>
        <img src="${post.postImage}" alt="Post image" class="w-full rounded-lg mb-4">
        <div class="flex justify-between items-center mb-4">
            <button class="like-button text-xl p-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white">
                Like this post (${post.likes})
            </button>
            <button class="comment-button text-xl p-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white">
                Add a comment
            </button>
        </div>
        <div class="comments-section">
            <h3 class="text-xl font-bold mb-2">Comments (${post.comments.length})</h3>
            <div class="comments-list space-y-2">
                ${post.comments.map(comment => `
                    <div class="p-3 bg-gray-700 rounded-lg text-white">
                        <div class="font-bold">${comment.user}</div>
                        <div>${comment.text}</div>
                    </div>
                `).join('')}
            </div>
            <div class="mt-4">
                <textarea class="comment-input border p-3 rounded-lg text-xl w-full bg-gray-700 text-white" 
                          placeholder="Write your comment here..."></textarea>
                <button class="submit-comment mt-2 bg-orange-600 text-white p-2 rounded-lg text-xl hover:bg-orange-700">
                    Post Comment
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to the new post
    const likeButton = postElement.querySelector('.like-button');
    likeButton.addEventListener('click', function() {
        post.likes++;
        this.textContent = `Like this post (${post.likes})`;
    });
    
    const submitCommentButton = postElement.querySelector('.submit-comment');
    const commentInput = postElement.querySelector('.comment-input');
    const commentsList = postElement.querySelector('.comments-list');
    const commentsCount = postElement.querySelector('h3');
    
    submitCommentButton.addEventListener('click', function() {
        if (commentInput.value.trim() !== '') {
            // Add new comment
            const newComment = {
                user: 'You',
                text: commentInput.value.trim()
            };
            post.comments.push(newComment);
            
            // Create comment element
            const commentElement = document.createElement('div');
            commentElement.className = 'p-3 bg-gray-700 rounded-lg text-white';
            commentElement.innerHTML = `
                <div class="font-bold">${newComment.user}</div>
                <div>${newComment.text}</div>
            `;
            commentsList.appendChild(commentElement);
            
            // Update comment count
            commentsCount.textContent = `Comments (${post.comments.length})`;
            
            // Clear input
            commentInput.value = '';
        } else {
            alert('Please write a comment before posting.');
        }
    });
    
    // Add the post to the feed (at the beginning)
    postsFeed.insertBefore(postElement, postsFeed.firstChild);
}