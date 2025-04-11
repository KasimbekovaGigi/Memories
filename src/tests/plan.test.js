describe('plan.js Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="postForm">
        <input id="postText" value="Test Post" />
        <input id="postImage" type="file" />
        <input id="postDate" value="2025-01-10" />
        <select id="postCategory">
          <option value="future" selected>Future</option>
          <option value="past">Past</option>
        </select>
      </form>

      <div id="futurePostsList"></div>
      <div id="pastPostsList"></div>
    `;

    require('../js/plan');

    global.FileReader = class {
      readAsDataURL() {
        this.result = 'data:image/png;base64,FAKE_IMAGE_DATA';
        if (this.onloadend) this.onloadend();
      }
    };
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("Should add a 'future' post and display it in #futurePostsList", async () => {
    const fileInput = document.getElementById('postImage');
    const mockFile = new Blob(['image content'], { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [mockFile],
    });

    document.getElementById('postForm').dispatchEvent(new Event('submit'));

    await new Promise((resolve) => setTimeout(resolve, 0));

    const futureContainer = document.getElementById('futurePostsList');
    const futurePosts = futureContainer.querySelectorAll('.post');

    expect(futurePosts.length).toBe(1);
    expect(futurePosts[0].textContent).toContain('Test Post');
    expect(futurePosts[0].textContent).toContain('Future/Plans');

    const img = futurePosts[0].querySelector('img');
    expect(img).not.toBeNull();
    expect(img.alt).toBe('Post Image');
  });

  test("Should add a 'past' post and display it in #pastPostsList", async () => {
    document.getElementById('postCategory').value = 'past';

    const fileInput = document.getElementById('postImage');
    const mockFile = new Blob(['image content'], { type: 'image/png' });
    Object.defineProperty(fileInput, 'files', {
      value: [mockFile],
    });

    document.getElementById('postForm').dispatchEvent(new Event('submit'));

    await new Promise((resolve) => setTimeout(resolve, 0));

    const pastContainer = document.getElementById('pastPostsList');
    const pastPosts = pastContainer.querySelectorAll('.post');

    expect(pastPosts.length).toBe(1);
    expect(pastPosts[0].textContent).toContain('Test Post');
    expect(pastPosts[0].textContent).toContain('Past/Memories');

    const img = pastPosts[0].querySelector('img');
    expect(img).not.toBeNull();
    expect(img.alt).toBe('Post Image');
  });
});
