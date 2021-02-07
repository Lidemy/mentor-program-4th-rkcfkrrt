/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import $ from 'jquery';

export function getComments(apiUrl, site_key, data, cb) {
  $.ajax({
    url: `${apiUrl}api_comments.php?site_key=${site_key}`,
  }).done(data => cb(data));
}

export function addComments(apiUrl, site_key, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}api_add_comments.php`,
    data,
  }).done(data => cb(data));
}
