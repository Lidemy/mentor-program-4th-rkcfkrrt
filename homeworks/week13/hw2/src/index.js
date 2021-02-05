/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import $ from 'jquery';
import { addComments } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getForm, getLoadMoreButton } from './templates';

// 初始化
export function init(options) {
  let apiUrl = '';
  let site_key = '';
  let containerElement = null;
  let mainClassName;
  let loadMoreClassName;
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  site_key = options.site_key;
  apiUrl = options.apiUrl;
  mainClassName = `${site_key}-main`;
  loadMoreClassName = `${site_key}-more`;
  commentsClassName = `${site_key}-comments`;
  formClassName = `${site_key}-add-comment-form`;
  commentsSelector = `.${commentsClassName}`;
  formSelector = `.${formClassName}`;
  containerElement = $(options.containerSelector);
  containerElement.append(getForm(mainClassName, formClassName, commentsClassName));
  appendStyle(cssTemplate);
  $(`.${mainClassName}`).append(getLoadMoreButton(loadMoreClassName));

  // 顯示留言
  const commentsDOM = $(commentsSelector);
  $.ajax({
    url: `${apiUrl}api_comments.php?site_key=${site_key}`,
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }

    const comments = data.discussions;
    const page = Math.ceil(comments.length / 5);
    if (comments.length <= 5) {
      $(`.${loadMoreClassName}`).addClass('hide');
    }
    let j = 0;
    // 顯示最新 5 則
    for (let i = 0; i < 5; i += 1) {
      appendCommentToDOM(commentsDOM, comments[i]);
    }
    // 監聽「載入更多」按鈕
    $('.container').on('click', (`.${loadMoreClassName}`), () => {
      // 點擊一次 j + 1，亦即留言數 +5
      j += 1;
      const set = (5 * j);
      for (let n = (0 + set); n < (5 + set); n += 1) {
        // 確認下一輪的 set 是否大於留言數目，若為是，則不顯示「載入更多」按鈕
        if ((j + 1) >= page) {
          $(`.${loadMoreClassName}`).addClass('hide');
        }
        // 放新增的 5 則到頁面
        if (n >= 0) {
          appendCommentToDOM(commentsDOM, comments[n]);
        }
      }
    });
  });

  // 新增留言
  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    };
    addComments(apiUrl, site_key, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentToDOM(commentsDOM, newCommentData, true);
    });
  });
}
