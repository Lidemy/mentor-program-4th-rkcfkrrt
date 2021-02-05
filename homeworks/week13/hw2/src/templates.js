export function getForm(mainClassName, className, commentsClassName) {
  return `
    <div class="${mainClassName}">
      <form class="${className}">
        <div class="form-group">
          <label for="form-nickname">暱稱</label>
          <input name="nickname" type="text" class="form-control" id="form-nickname">
        </div>
        <div class="form-group">
          <label for="content-textarea">留言內容</label>
          <textarea name="content" class="form-control" id="content-textarea" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">送出</button>
      </form>
      <div class="${commentsClassName}"></div>
    </div>
  `;
}

export function getLoadMoreButton(className) {
  return `<button class="${className} btn btn-primary more">載入更多</button>`;
}

export const cssTemplate = `
  .add-comment-form {
    margin-top: 12px;
  }

  .card {
    margin-top: 12px;
  }

  .more {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .hide {
    display: none;
  }
`;
