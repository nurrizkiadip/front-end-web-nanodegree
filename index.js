(async () => {
  const blogsList = document.getElementById('blog-list');

  const BlogsApi = {
    async initBlogs({ blogsContainer }) {
      this._blogsContainer = blogsContainer;

      const blogs = await this.getBlogs();

      this.populateBlogs(blogs);
    },

    async getBlogs() {
      const response = await fetch('/blogs.json');
      const data = await response.json();

      return [...data];
    },

    populateBlogs(blogs) {
      if (blogs.length < 1) {
        this._blogsContainer.textContent =
          'Menunggu proses pencarian atau data yang dicari tidak ditemukan!';
        return;
      }

      this._blogsContainer.innerHTML = blogs
        .map((blog) => {
          return `
            <article class="blog-item">
              <h5 class="blog-item__title" data-blog-category="${blog.category}">${blog.title}</h5>
              <div class="blog-item__date">${blog.createdAt}</div>
              <div class="blog-item__short-description">
                ${blog.shortDescription}
              </div>
              <div class="blog-item__continue-button">
                <a href="/blog/${blog.slug}">Continue reading</a>
              </div>
            </article>
          `;
        })
        .join('');
    },
  };

  async function init() {
    await BlogsApi.initBlogs({ blogsContainer: blogsList });
  }

  init();
})();
